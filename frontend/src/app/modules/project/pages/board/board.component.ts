import { Component, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { Observable } from 'rxjs';
import { Project } from '@app/data/model/project.model';
import { ProjectStore } from '../../project.store';
import { tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueAddModalComponent } from '../../components/issue/issue-add-modal/issue-add-modal.component';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { userSelector } from '@app/core/store/auth/auth.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumb: NavLink[] = [new NavLink('Projects', null, '/projects')];
  project$: Observable<Project>;
  currentuser$: Observable<User>;

  constructor(private store: Store, private projectStore: ProjectStore, private nzModalService: NzModalService) {}

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
    this.currentuser$ = this.store.pipe(select(userSelector));
  }

  onOpenAddIssueModal(currentProject: Project, currentUser: User) {
    this.nzModalService.create({
      nzContent: IssueAddModalComponent,
      nzComponentParams: {
        currentProject: currentProject,
        currentUser: currentUser
      },
      nzClosable: false,
      nzFooter: null,
      nzAutofocus: null,
      nzWidth: 720 
    });
  }
}
