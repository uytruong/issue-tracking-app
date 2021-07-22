import { Component, OnInit } from '@angular/core';
import { Project } from '@app/data/model/project';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectStore } from '../../project.store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  breadcrumb: NavLink[] = [
    new NavLink('Projects', null, '/projects')
  ];
  project$: Observable<Project>;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.project$ = this.projectStore.project$.pipe(
      tap((project) => {
        this.breadcrumb = [
          ...this.breadcrumb,
          new NavLink(project.name, null, '../'),
          new NavLink('Settings', null, './')
        ];
      })
    );
  }

}
