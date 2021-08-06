import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IssueType } from '@app/data/model/issue.model';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';

class TypeCheckbox {
  typeIcon: IssueTypeIcon;
  checked: boolean;
  constructor(type: IssueType, control: FormControl) {
    this.typeIcon = new IssueTypeIcon(type);
    this.checked = control.value.includes(type);
  }
}
@Component({
  selector: 'app-board-dnd-filter-type',
  templateUrl: './board-dnd-filter-type.component.html',
  styleUrls: ['./board-dnd-filter-type.component.scss']
})
export class BoardDndFilterTypeComponent implements OnInit {
  @Input() control: FormControl;
  checkboxes: TypeCheckbox[];

  constructor() { }

  ngOnInit(): void {
    this.checkboxes = [
      new TypeCheckbox(IssueType.STORY, this.control),
      new TypeCheckbox(IssueType.TASK, this.control),
      new TypeCheckbox(IssueType.BUG, this.control)
    ];
  }

  updateType() {
    const selectedTypes = this.checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.typeIcon.value);
  this.control.patchValue(selectedTypes);
  }

}
