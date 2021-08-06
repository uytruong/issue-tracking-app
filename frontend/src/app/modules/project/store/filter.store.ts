import { Injectable } from '@angular/core';
import { IssuePriority } from '@app/data/model/issue.model';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface FilterState {
  searchString: string;
  userIds: string[];
  priorities: string[];
  types: string[];
}

const initialState: FilterState = {
  searchString: '',
  userIds: [],
  priorities: [],
  types: []
};

@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  constructor() {
    super(initialState);
  }

  // Selectors
  readonly searchString$: Observable<string> = this.select((state) => state.searchString);
  readonly userIds$: Observable<string[]> = this.select((state) => state.userIds);
  readonly priorities$: Observable<string[]> = this.select((state) => state.priorities);
  readonly types$: Observable<string[]> = this.select((state) => state.types);
  readonly allConditions$: Observable<FilterState> = this.select(
    this.searchString$,
    this.userIds$,
    this.priorities$,
    this.types$,
    (searchString, userIds, priorities, types) => ({
      searchString,
      userIds,
      priorities,
      types
    })
  );

  // Updaters
  readonly updateSearchString = this.updater((state: FilterState, searchString: string) => {
    return {
      ...state,
      searchString: searchString
    };
  });

  readonly updateUserIds = this.updater((state: FilterState, newUserIds: string[]) => {
    return {
      ...state,
      userIds: newUserIds
    };
  });

  readonly updatePriorities = this.updater((state: FilterState, newPriorities: string[]) => {
    return {
      ...state,
      priorities: newPriorities
    };
  });

  readonly updateTypes = this.updater((state: FilterState, newTypes: string[]) => {
    return {
      ...state,
      types: newTypes
    };
  });
}
