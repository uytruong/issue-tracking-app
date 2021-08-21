import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@app/core/constant/project-const';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { Project } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { ProjectCreateModalComponent } from './components/project-create-modal/project-create-modal.component';
import { ProjectListStore } from './project-list.store';

interface ProjectsVM {
  projects: Project[];
  loading: boolean;
  error: string;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  user$: Observable<User>;
  vm$: Observable<ProjectsVM>;
  projectsMetadata: string[] = ProjectConst.ProjectMetadata;
  private currentUser: User;

  constructor(
    private store: Store,
    private projectListStore: ProjectListStore,
    private nzModalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(userSelector),
      tap((user) => {
        if (user) {
          this.currentUser = user;
          this.projectListStore.getProjects(user.projectIds);
        }
      })
    );
    this.vm$ = this.projectListStore.vm$;
  }

  onOpenCreateModal() {
    this.nzModalService.create({
      nzContent: ProjectCreateModalComponent,
      nzComponentParams: {
        user: this.currentUser
      },
      nzClosable: false,
      nzFooter: null,
      nzAutofocus: null,
      nzWidth: 720
    });
  }
}
