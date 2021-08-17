import { Component, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { Observable } from 'rxjs';
import { Project } from '@app/data/model/project.model';
import { ProjectStore } from '../../store/project.store';
import { tap } from 'rxjs/operators';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { userSelector } from '@app/core/store/auth/auth.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumb: NavLink[] = [];
  project$: Observable<Project>;
  currentUser$: Observable<User>;

  constructor(private store: Store, private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.project$ = this.projectStore.project$.pipe(
      tap((project) => {
        // Init breadcrumb view model
        this.breadcrumb = [
          new NavLink('Projects', null, '/projects'),
          new NavLink(project.name, null, '../'),
          new NavLink('Kanban Board', null, './')
        ];
      })
    );
    this.currentUser$ = this.store.pipe(select(userSelector));
  }
}
