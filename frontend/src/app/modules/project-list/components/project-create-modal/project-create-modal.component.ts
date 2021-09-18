import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { editorConfig } from '@app/core/configs/text-editor';
import { CreateProjectPayload, ProjectCategory } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectListStore } from '../../project-list.store';

@Component({
  selector: 'app-project-create-modal',
  templateUrl: './project-create-modal.component.html',
  styleUrls: ['./project-create-modal.component.scss']
})
export class ProjectCreateModalComponent implements OnInit {
  @Input() user: User;
  createProjectForm: FormGroup;
  categories: ProjectCategory[];
  editorConfig: AngularEditorConfig = editorConfig;
  keyTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'fill'
  };

  constructor(
    private nzModalRef: NzModalRef,
    private formBuilder: FormBuilder,
    private projectListStore: ProjectListStore
  ) {}

  ngOnInit(): void {
    this.categories = [ProjectCategory.SOFTWARE, ProjectCategory.BUSINESS];
    this.initForm();
  }

  get formControls() {
    return this.createProjectForm?.controls;
  }

  initForm() {
    this.createProjectForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9 ]{6,50}$/i)
        ]
      ],
      key: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z0-9]{3,32}$/i)
        ]
      ],
      description: '',
      category: ProjectCategory.SOFTWARE,
      users: [[], Validators.required]
    });
  }

  onSubmit() {
    if (!this.createProjectForm.valid) {
      return;
    }
    const formValue = this.createProjectForm.getRawValue();
    const payload: CreateProjectPayload = {
      ...formValue,
      userIds: formValue.users.map(user => user.id)
    };

    this.projectListStore.postCreateProject(payload);
    this.onCloseModal();
  }

  onCloseModal() {
    this.nzModalRef.close();
  }
}
