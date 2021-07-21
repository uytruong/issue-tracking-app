import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@app/data/model/issue';
import { IssuePriorityIcon } from '@app/data/ui-model/issue-priority-icon';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() issue: Issue;
  typeIcon: IssueTypeIcon;
  priorityIcon: IssuePriorityIcon;

  constructor() { }

  ngOnInit(): void {
    this.typeIcon = new IssueTypeIcon(this.issue.type);
    this.priorityIcon = new IssuePriorityIcon(this.issue.priority); 
  }

}
