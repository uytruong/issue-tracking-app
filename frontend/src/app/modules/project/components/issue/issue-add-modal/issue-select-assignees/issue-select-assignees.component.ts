import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/data/model/user.model';

@Component({
  selector: 'app-issue-select-assignees',
  templateUrl: './issue-select-assignees.component.html',
  styleUrls: ['./issue-select-assignees.component.scss']
})
export class IssueSelectAssigneesComponent implements OnInit {
  @Input() control: FormControl;
  @Input() users: User[];

  constructor() { }

  ngOnInit(): void {
  }

  getUser(id: string) {
    return this.users.find((user) => (user.id === id));
  }
}
