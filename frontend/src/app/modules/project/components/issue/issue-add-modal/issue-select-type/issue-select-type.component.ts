import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IssueType } from '@app/data/model/issue.model';
import { IssueTypeIcon } from '@app/data/ui-model/issue-type-icon';

@Component({
  selector: 'app-issue-select-type',
  templateUrl: './issue-select-type.component.html',
  styleUrls: ['./issue-select-type.component.scss']
})
export class IssueSelectTypeComponent implements OnInit {
  @Input() control: FormControl;
  types: IssueTypeIcon[];

  constructor() { }

  ngOnInit(): void {
    this.types = [
      new IssueTypeIcon(IssueType.STORY),
      new IssueTypeIcon(IssueType.TASK),
      new IssueTypeIcon(IssueType.BUG)
    ]
  }

  typeIcon(value: IssueType) {
    return new IssueTypeIcon(value).icon;
  }

}
