import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@app/core/constant/project-const';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { Project } from '@app/data/model/project';
import { User } from '@app/data/model/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectListStore } from './project-list.store';

interface ProjectsVM {
  projects: Project[];
  loading: boolean;
  error: string;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ProjectListStore]
})
export class ProjectListComponent implements OnInit {
  user$: Observable<User>;
  vm$: Observable<ProjectsVM>;
  projectsMetadata: string[] = ProjectConst.ProjectMetadata;

  constructor(private store: Store, private projectListStore: ProjectListStore) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(userSelector),
      tap(user => this.projectListStore.getProjects(user.projectIds))
    );
    this.vm$ = this.projectListStore.vm$;
  }
}
