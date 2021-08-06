import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IssuePriority } from '@app/data/model/issue.model';
import { IssuePriorityIcon } from '@app/data/ui-model/issue-priority-icon';

class PriorityCheckbox {
  icon: IssuePriorityIcon;
  checked: boolean;
  constructor(priorityValue: IssuePriority, control: FormControl) {
    this.icon = new IssuePriorityIcon(priorityValue);
    this.checked = control.value.includes(priorityValue);
  }
}
@Component({
  selector: 'app-board-dnd-filter-priority',
  templateUrl: './board-dnd-filter-priority.component.html',
  styleUrls: ['./board-dnd-filter-priority.component.scss']
})
export class BoardDndFilterPriorityComponent implements OnInit {
  @Input() control: FormControl;
  checkboxes: PriorityCheckbox[];

  constructor() {}

  ngOnInit(): void {
    this.checkboxes = [
      new PriorityCheckbox(IssuePriority.HIGH, this.control),
      new PriorityCheckbox(IssuePriority.MEDIUM, this.control),
      new PriorityCheckbox(IssuePriority.LOW, this.control)
    ];
  }

  updatePriority() {
    const selectedPriorities = this.checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.icon.value);
    this.control.patchValue(selectedPriorities);
  }
}
