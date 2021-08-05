import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Issue, IssuePriority, IssueStage, IssueType } from '@data/model/issue.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { editorConfig } from '@app/core/configs/text-editor';
import { User } from '@app/data/model/user.model';
import { Observable } from 'rxjs';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { Project } from '@app/data/model/project.model';

@Component({
  selector: 'app-issue-add-modal',
  templateUrl: './issue-add-modal.component.html',
  styleUrls: ['./issue-add-modal.component.scss']
})
export class IssueAddModalComponent implements OnInit {
  @Input() currentProject: Project;
  @Input() currentUser: User;
  addIssueForm: FormGroup;
  editorConfig: AngularEditorConfig = { ...editorConfig, showToolbar: true };
  users$: Observable<User[]>;

  constructor(
    private nzModalRef: NzModalRef,
    private formBuilder: FormBuilder,
    private projectStore: ProjectStore
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.users$ = this.projectStore.users$;
  }

  get formControls() {
    return this.addIssueForm?.controls;
  }

  initForm() {
    this.addIssueForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: IssueType.STORY,
      priority: IssuePriority.LOW,
      description: '',
      reporterId: this.currentUser.id,
      assigneesId: []
    });
  }

  onSubmit() {
    const formValue = this.addIssueForm.getRawValue();
    const now = new Date();
    const newIssue: Issue = {
      ...formValue,
      id: now.getTime().toString(),
      stage: IssueStage.BACKLOG,
      projectId: this.currentProject.id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    }
    this.projectStore.addIssue(newIssue);

    this.onCloseModal();
  }

  onCloseModal() {
    this.nzModalRef.close();
  }
}
