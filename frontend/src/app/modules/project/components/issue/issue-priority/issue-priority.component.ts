import { Component, Input, OnInit } from '@angular/core';
import { Issue, IssuePriority } from '@app/data/model/issue.model';
import { User } from '@app/data/model/user.model';
import { IssuePriorityIcon } from '@app/data/ui-model/issue-priority-icon';
import { ProjectStore } from '@app/modules/project/store/project.store';

@Component({
  selector: 'app-issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnInit {
  @Input() issue: Issue;
  @Input() users: User[];
  priorityIcon: IssuePriorityIcon;
  priorityIcons: IssuePriorityIcon[];

  constructor(private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.priorityIcon = new IssuePriorityIcon(this.issue.priority);
    this.priorityIcons = [
      new IssuePriorityIcon(IssuePriority.HIGH),
      new IssuePriorityIcon(IssuePriority.MEDIUM),
      new IssuePriorityIcon(IssuePriority.LOW)
    ]
  }

  onChangePriority(value: IssuePriority) {
    this.priorityIcon = new IssuePriorityIcon(value);
    this.projectStore.updateIssue({ ...this.issue, priority: value })
  }

}
