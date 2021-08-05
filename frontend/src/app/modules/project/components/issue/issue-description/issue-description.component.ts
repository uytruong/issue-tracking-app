import { Component, Input, OnInit } from '@angular/core';
import { editorConfig } from '@app/core/configs/text-editor';
import { Issue } from '@app/data/model/issue.model';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss']
})
export class IssueDescriptionComponent implements OnInit {
  @Input() issue: Issue;
  @Input() content: string;
  editorConfig: AngularEditorConfig = editorConfig;
  isDisplay: boolean = false;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {}

  onStartEdit() {
    this.editorConfig = { ...this.editorConfig, showToolbar: true };
    this.isDisplay = true;
  }

  onSaveEdit() {
    this.projectStore.updateIssue({ ...this.issue, description: this.content });
    this.isDisplay = false;
  }

  onCancelEdit() {
    this.editorConfig = { ...this.editorConfig, showToolbar: false };
    this.isDisplay = false;
  }

}
