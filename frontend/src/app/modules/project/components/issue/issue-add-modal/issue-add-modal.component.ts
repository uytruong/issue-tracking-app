import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IssuePriority, IssueStage, IssueType } from '../../../../../data/model/issue.model';

@Component({
  selector: 'app-issue-add-modal',
  templateUrl: './issue-add-modal.component.html',
  styleUrls: ['./issue-add-modal.component.scss']
})
export class IssueAddModalComponent implements OnInit {
  addIssueForm: FormGroup;

  constructor(private nzModalRef: NzModalRef, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  onCloseModal() {
    this.nzModalRef.close();
  }

  get formControls() {
    return this.addIssueForm?.controls;
  }

  initForm() {
    this.addIssueForm = this.formBuilder.group({
      title: '',
      type: IssueType.STORY,
      priority: IssuePriority.LOW,
      description: '',
      reporterId: '',
      assigneesId: []
    });
  }
}
