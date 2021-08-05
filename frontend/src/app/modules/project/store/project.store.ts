import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Issue, IssueStage } from '@app/data/model/issue.model';
import { Project } from '@app/data/model/project.model';
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
      loading: status
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
    }
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
    let filteredStageIssues = cloneIssues.filter(issue => issue.stage === newIssue.stage);
    const newListPosition = filteredStageIssues.length + 1;
    newIssue.listPosition = newListPosition;
    cloneIssues.push(newIssue);
    return {
      ...state,
      issues: cloneIssues
    }
  });

  readonly addComment = this.updater((state: ProjectState, newComment: IssueComment) => {
    const cloneComments = [...state.comments];
    cloneComments.push(newComment);
    return {
      ...state,
      comments: cloneComments
    }
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
}
