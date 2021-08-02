import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@app/data/model/issue';
import { User } from '@app/data/model/user';
import { ProjectStore } from '@app/modules/project/project.store';

@Component({
  selector: 'app-issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
export class IssueReporterComponent implements OnInit {
  @Input() issue: Issue;
  @Input() users: User[];
  reporter: User;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.reporter = this.users.find((user) => user.id === this.issue.reporterId);
  }

  onChooseReporter(id: string) {
    this.reporter = this.users.find((user) => user.id === id);
    this.projectStore.updateIssue({ ...this.issue, reporterId: id });
  }
}
