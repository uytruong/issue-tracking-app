import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@app/data/model/issue';
import { User } from '@app/data/model/user';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';
import { ProjectStore } from '@app/modules/project/project.store';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
  issue$: Observable<Issue>;
  typeIcon: IssueTypeIcon;

  constructor(private nzModalRef: NzModalRef, private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.issue$ = this.projectStore
      .issueById$(this.id)
      .pipe(tap((issue) => (this.typeIcon = new IssueTypeIcon(issue.type))));
  }

  onCloseModal() {
    this.nzModalRef.close();
  }
}
