import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@app/data/model/issue.model';
import { User } from '@app/data/model/user.model';
import { IssuePriorityIcon } from '@app/data/ui-model/issue-priority-icon';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { IssueDetailModalComponent } from '../issue-detail-modal/issue-detail-modal.component';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() issue: Issue;
  typeIcon: IssueTypeIcon;
  priorityIcon: IssuePriorityIcon;
  users$: Observable<User[]>;

  constructor(private nzModalService: NzModalService, private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.typeIcon = new IssueTypeIcon(this.issue.type);
    this.priorityIcon = new IssuePriorityIcon(this.issue.priority);
    this.users$ = this.projectStore.users$; 
  }

  onOpenIssueModal(id: string) {
    this.nzModalService.create({
      nzContent: IssueDetailModalComponent,
      nzComponentParams: {
        id: this.issue.id,
        users$: this.users$
      },
      nzClosable: false,
      nzFooter: null,
      nzAutofocus: null,
      nzWidth: 1040 
    });
  }
}
