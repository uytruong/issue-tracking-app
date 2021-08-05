import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueAddModalComponent } from '../../issue/issue-add-modal/issue-add-modal.component';

@Component({
  selector: 'app-board-dnd-actions',
  templateUrl: './board-dnd-actions.component.html',
  styleUrls: ['./board-dnd-actions.component.scss']
})
export class BoardDndActionsComponent implements OnInit {
  @Input() project: Project;
  @Input() currentUser: User;

  constructor(private nzModalService: NzModalService) { }

  ngOnInit(): void {
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
