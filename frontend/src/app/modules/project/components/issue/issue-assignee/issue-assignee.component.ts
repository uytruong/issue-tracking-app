import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@app/data/model/issue.model';
import { User } from '@app/data/model/user.model';
import { ProjectStore } from '@app/modules/project/project.store';

@Component({
  selector: 'app-issue-assignee',
  templateUrl: './issue-assignee.component.html',
  styleUrls: ['./issue-assignee.component.scss']
})
export class IssueAssigneeComponent implements OnInit {
  @Input() issue: Issue;
  @Input() users: User[];
  assignees: User[];

  constructor(private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.assignees = this.users.filter(user => this.issue.assigneesId.includes(user.id));
  }

  get filterNonAssignees() {
    const filteredIds = this.assignees.map(assignee => assignee.id);
    return this.users.filter(user => !filteredIds.includes(user.id))
  }

  onAddAssignee(id: string) {
    const newAssigneesId = [...this.issue.assigneesId];
    newAssigneesId.push(id); 
    this.assignees.push(this.users.find(user => user.id === id));
    this.projectStore.updateIssue({ ...this.issue, assigneesId: newAssigneesId })
  }

  onRemoveAssignee(id: string) {
    let newAssigneesId = [...this.issue.assigneesId];
    newAssigneesId = newAssigneesId.filter(assigneeId => assigneeId !== id); 
    const removedUser = this.users.find(user => user.id === id);
    this.assignees = this.assignees.filter(assignee => assignee.id !== removedUser.id);
    this.projectStore.updateIssue({ ...this.issue, assigneesId: newAssigneesId })
  }
}
