import { Project } from '@app/data/model/project';

export const enum StatusState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

export interface ProjectState {
  projects: Project[];
  status: StatusState;
  error: string;
}

const initialState: ProjectState = {
  projects: [null],
  status: StatusState.INIT,
  error: ''
};

// export class ProjectListStore 
