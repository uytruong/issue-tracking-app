import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IssueComment, IssueCommentPayload } from '@app/data/model/issue-comment.model';
import { CreateIssuePayload, Issue } from '@app/data/model/issue.model';
import { Project, UpdateProjectPayload } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProjectService } from '../project.service';

export const enum StatusState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

export interface ProjectState {
  project: Project;
  issues: Issue[];
  users: User[];
  comments: IssueComment[];
  status: StatusState;
  error: string;
}

const initialState: ProjectState = {
  project: null,
  issues: [],
  users: [],
  comments: [],
  status: StatusState.INIT,
  error: ''
};

@Injectable()
export class ProjectStore extends ComponentStore<ProjectState> {
  constructor(private projectService: ProjectService) {
    super(initialState);
  }

  // Selectors
  readonly project$: Observable<Project> = this.select((state) => state.project);
  readonly issues$: Observable<Issue[]> = this.select((state) => state.issues);
  readonly issuesSortedByStage$ = (stage): Observable<Issue[]> =>
    this.issues$.pipe(
      map((issues: Issue[]) => {
        return issues
          .filter((issue) => issue.stage === stage)
          .sort((a, b) => a.listPosition - b.listPosition);
      })
    );
  readonly issueById$ = (id: string): Observable<Issue> =>
    this.issues$.pipe(
      map((issues: Issue[]) => {
        return issues.find((issue) => issue.id === id);
      })
    );
  readonly users$: Observable<User[]> = this.select((state) => state.users);
  readonly comments$: Observable<IssueComment[]> = this.select((state) => state.comments);
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.status === StatusState.LOADING
  );
  readonly error$: Observable<string> = this.select((state) => state.error);

  readonly vm$ = this.select(
    this.project$,
    this.issues$,
    this.loading$,
    this.error$,
    (project, issues, loading, error) => ({
      project,
      issues,
      loading,
      error
    })
  );

  // Updaters
  readonly updateStatus = this.updater((state: ProjectState, status: StatusState) => {
    return {
      ...state,
      status: status
    };
  });

  readonly updateProject = this.updater((state: ProjectState, project: Project) => {
    return {
      ...state,
      project: project
    };
  });

  readonly updateIssues = this.updater((state: ProjectState, issues: Issue[]) => {
    return {
      ...state,
      issues: issues
    };
  });

  readonly updateUsers = this.updater((state: ProjectState, users: User[]) => {
    return {
      ...state,
      users: users
    };
  });

  readonly updateComments = this.updater((state: ProjectState, comments: IssueComment[]) => {
    return {
      ...state,
      comments: comments
    };
  });

  readonly updateIssue = this.updater((state: ProjectState, newIssue: Issue) => {
    let cloneIssues = [...state.issues];
    cloneIssues = cloneIssues.map((issue) => (issue.id === newIssue.id ? { ...newIssue } : issue));
    return {
      ...state,
      issues: cloneIssues
    };
  });

  readonly addIssue = this.updater((state: ProjectState, newIssue: Issue) => {
    let cloneIssues = [...state.issues];
    cloneIssues.push(newIssue);
    return {
      ...state,
      issues: cloneIssues
    };
  });

  readonly deleteIssue = this.updater((state: ProjectState, deletedIssue: Issue) => {
    let cloneIssues = [...state.issues];
    cloneIssues = cloneIssues.filter((issue) => issue.id !== deletedIssue.id);
    return {
      ...state,
      issues: cloneIssues
    };
  });

  readonly addComment = this.updater((state: ProjectState, newComment: IssueComment) => {
    const cloneComments = [...state.comments];
    cloneComments.push(newComment);
    return {
      ...state,
      comments: cloneComments
    };
  });

  readonly updateError = this.updater((state: ProjectState, errorMsg: string) => {
    return {
      ...state,
      status: StatusState.ERROR,
      error: errorMsg
    };
  });

  // Effects
  readonly getProject = this.effect((projectKey$: Observable<string>) => {
    return projectKey$.pipe(
      switchMap((key) => {
        this.updateStatus(StatusState.LOADING);
        return this.projectService.getProjectByKey(key).pipe(
          tapResponse(
            (projects) => {
              this.updateStatus(StatusState.LOADED);
              this.updateProject(projects[0]);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postUpdateProject = this.effect((project$: Observable<UpdateProjectPayload>) => {
    return project$.pipe(
      switchMap((project) => {
        this.updateStatus(StatusState.LOADING);
        return this.projectService.updateProject(project).pipe(
          tapResponse(
            (project) => {
              this.updateStatus(StatusState.LOADED);
              this.updateProject(project);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly getIssues = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      switchMap((projectId) => {
        return this.projectService.getIssuesByProjectId(projectId).pipe(
          tapResponse(
            (issues) => {
              this.updateIssues(issues);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postAddIssue = this.effect((newIssue$: Observable<CreateIssuePayload>) => {
    return newIssue$.pipe(
      switchMap((issue) => {
        return this.projectService.createIssue(issue).pipe(
          tapResponse(
            (issue) => {
              this.addIssue(issue);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postUpdateIssue = this.effect((updateIssue$: Observable<Issue>) => {
    return updateIssue$.pipe(
      switchMap((issue) => {
        return this.projectService.updateIssue(issue).pipe(
          tapResponse(
            (issue) => {
              this.updateIssue(issue);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postDeleteIssue = this.effect((issueId$: Observable<string>) => {
    return issueId$.pipe(
      switchMap((issueId) => {
        return this.projectService.deleteIssue(issueId).pipe(
          tapResponse(
            (deletedIssue) => {
              this.deleteIssue(deletedIssue);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly getUsers = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      switchMap((projectId) => {
        return this.projectService.getUsersByProjectId(projectId).pipe(
          tapResponse(
            (users) => {
              this.updateUsers(users);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly getComments = this.effect((issueId$: Observable<string>) => {
    return issueId$.pipe(
      switchMap((issueId) => {
        return this.projectService.getCommentsByIssueId(issueId).pipe(
          tapResponse(
            (comments) => {
              this.updateComments(comments);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postComment = this.effect((comment$: Observable<IssueCommentPayload>) => {
    return comment$.pipe(
      switchMap((comment) => {
        return this.projectService.postComment(comment).pipe(
          tapResponse(
            (comment) => {
              this.addComment(comment);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });
}
