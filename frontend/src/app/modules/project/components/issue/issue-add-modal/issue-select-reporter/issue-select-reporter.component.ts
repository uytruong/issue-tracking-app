import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/data/model/user.model';
import { ProjectStore } from '@app/modules/project/project.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issue-select-reporter',
  templateUrl: './issue-select-reporter.component.html',
  styleUrls: ['./issue-select-reporter.component.scss']
})
export class IssueSelectReporterComponent implements OnInit {
  @Input() control: FormControl;
  @Input() users: User[];

  constructor() {}

  ngOnInit(): void {
  }

  getUser(id: string) {
    return this.users.find((user) => (user.id === id));
  }
}
