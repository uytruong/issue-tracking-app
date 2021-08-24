import { Component, Input, OnInit } from '@angular/core';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { Issue } from '@app/data/model/issue.model';
import { Role, User } from '@app/data/model/user.model';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { select, Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-issue-detail-modal',
  templateUrl: './issue-detail-modal.component.html',
  styleUrls: ['./issue-detail-modal.component.scss']
})
export class IssueDetailModalComponent implements OnInit {
  @Input() id: string;
  @Input() users$: Observable<User[]>;
  currentUser$: Observable<User>;
  issue$: Observable<Issue>;
  typeIcon: IssueTypeIcon;
  confirmModal?: NzModalRef;

  constructor(
    private nzModalRef: NzModalRef,
    private projectStore: ProjectStore,
    private nzModalService: NzModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.issue$ = this.projectStore
      .issueById$(this.id)
      .pipe(tap((issue) => (this.typeIcon = new IssueTypeIcon(issue?.type))));
    this.currentUser$ = this.store.pipe(select(userSelector));
  }

  onCloseModal() {
    this.nzModalRef.close();
  }

  onShowConfirm() {
    this.confirmModal = this.nzModalService.confirm({
      nzTitle: 'Do you want to delete this issue?',
      nzContent: 'You cannot undo this.',
      nzOnOk: () => this.onDeleteIssue()
    });
  }

  onDeleteIssue() {
    this.projectStore.postDeleteIssue(this.id);
    this.onCloseModal();
  }

  isAdmin(user: User) {
    return user.role === Role.ADMIN;
  }
}
