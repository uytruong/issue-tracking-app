import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProjectPayload, DeleteProjectPayload, Project } from '@app/data/model/project.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProjectListService } from './project-list.service';

export const enum StatusState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

export interface ProjectListState {
  projects: Project[];
  status: StatusState;
  error: string;
}

const initialState: ProjectListState = {
  projects: [],
  status: StatusState.INIT,
  error: ''
};

@Injectable()
export class ProjectListStore extends ComponentStore<ProjectListState> {
  constructor(private projectListService: ProjectListService) {
    super(initialState);
  }

  // Selectors
  readonly projects$: Observable<Project[]> = this.select((state) => state.projects);
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.status === StatusState.LOADING
  );
  readonly error$: Observable<string> = this.select((state) => state.error);

  readonly vm$ = this.select(
    this.projects$,
    this.loading$,
    this.error$,
    (projects, loading, error) => ({
      projects,
      loading,
      error
    })
  );

  // Updaters
  readonly updateStatus = this.updater((state: ProjectListState, status: StatusState) => {
    return {
      ...state,
      loading: status
    };
  });

  readonly updateProjects = this.updater((state: ProjectListState, projects: Project[]) => {
    return {
      ...state,
      projects: projects
    };
  });

  readonly updateError = this.updater((state: ProjectListState, errorMsg: string) => {
    return {
      ...state,
      status: StatusState.ERROR,
      error: errorMsg
    };
  });

  readonly addProject = this.updater((state: ProjectListState, newProject: Project) => {
    let cloneProjects = [...state.projects];
    cloneProjects.push(newProject);
    return {
      ...state,
      projects: cloneProjects
    };
  });

  readonly deleteProject = this.updater((state: ProjectListState, deletedProject: Project) => {
    let cloneProjects = [...state.projects];
    cloneProjects = cloneProjects.filter((project) => project.id !== deletedProject.id);
    return {
      ...state,
      projects: cloneProjects
    };
  });

  // Effects
  readonly getProjects = this.effect((ids$: Observable<string[]>) => {
    return ids$.pipe(
      switchMap((ids: string[]) => {
        this.updateStatus(StatusState.LOADING);
        return this.projectListService.getProjectsByIds(ids).pipe(
          tapResponse(
            (projects) => {
              this.updateStatus(StatusState.LOADED);
              this.updateProjects(projects);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postCreateProject = this.effect((payload$: Observable<CreateProjectPayload>) => {
    return payload$.pipe(
      switchMap((payload: CreateProjectPayload) => {
        return this.projectListService.createProject(payload).pipe(
          tapResponse(
            (response) => {
              this.addProject(response.project);
              this.projectListService.updateUserToken(response.user);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });

  readonly postDeleteProject = this.effect((payload$: Observable<DeleteProjectPayload>) => {
    return payload$.pipe(
      switchMap((payload: DeleteProjectPayload) => {
        return this.projectListService.deleteProject(payload).pipe(
          tapResponse(
            (deletedProject) => {
              this.deleteProject(deletedProject.project);
              this.projectListService.updateUserToken(deletedProject.user);
            },
            (errorRes: HttpErrorResponse) => this.updateError(errorRes.message)
          )
        );
      })
    );
  });
}
