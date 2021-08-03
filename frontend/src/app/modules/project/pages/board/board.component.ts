import { Component, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { Observable } from 'rxjs';
import { Project } from '@app/data/model/project.model';
import { ProjectStore } from '../../project.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumb: NavLink[] = [new NavLink('Projects', null, '/projects')];
  project$: Observable<Project>;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.project$ = this.projectStore.project$.pipe(
      tap((project) => {
        // Init breadcrumb view model
        this.breadcrumb = [
          ...this.breadcrumb,
          new NavLink(project.name, null, '../'),
          new NavLink('Kanban Board', null, './')
        ];
      })
    );
  }
}
