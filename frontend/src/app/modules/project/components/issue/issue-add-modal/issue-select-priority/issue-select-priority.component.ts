import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IssuePriority } from '@app/data/model/issue.model';
import { IssuePriorityIcon } from '@app/data/ui-model/issue-priority-icon';

@Component({
  selector: 'app-issue-select-priority',
  templateUrl: './issue-select-priority.component.html',
  styleUrls: ['./issue-select-priority.component.scss']
})
export class IssueSelectPriorityComponent implements OnInit {
  @Input() control: FormControl;
  priorities: IssuePriorityIcon[];

  constructor() { }

  ngOnInit(): void {
    this.priorities = [
      new IssuePriorityIcon(IssuePriority.HIGH),
      new IssuePriorityIcon(IssuePriority.MEDIUM),
      new IssuePriorityIcon(IssuePriority.LOW)
    ]
  }

  priorityIcon(value: IssuePriority) {
    return new IssuePriorityIcon(value);
  }
}
