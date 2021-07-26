import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue, IssueStage } from '@app/data/model/issue';
import { Project } from '@app/data/model/project';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProjectService } from './project.service';

export const enum StatusState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

export interface ProjectState {
  project: Project;
  issues: Issue[];
  status: StatusState;
  error: string;
}

const initialState: ProjectState = {
  project: null,
  issues: [],
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

  readonly updateIssue = this.updater((state: ProjectState, newIssue: Issue) => {
    let cloneIssues = [...state.issues];
    cloneIssues = cloneIssues.map((issue) => (issue.id === newIssue.id ? { ...newIssue } : issue));
    return {
      ...state,
      issues: cloneIssues
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
}
