import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface FilterState {
  searchString: string;
  userIds: string[];
}

const initialState: FilterState = {
  searchString: '',
  userIds: []
};

@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  constructor() {
    super(initialState);
  }

  // Selectors
  readonly searchString$: Observable<string> = this.select((state) => state.searchString);
  readonly userIds$: Observable<string[]> = this.select((state) => state.userIds);

  // Updaters
  readonly updateSearchString = this.updater((state: FilterState, searchString: string) => {
    return {
      ...state,
      searchString: searchString
    };
  });

}
