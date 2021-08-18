import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { editorConfig } from '@app/core/configs/text-editor';
import { Project, ProjectCategory, UpdateProjectPayload } from '@app/data/model/project.model';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';
import { ProjectStore } from '../../store/project.store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  breadcrumb: NavLink[];
  project$: Observable<Project>;
  projectSettingsForm: FormGroup;
  editorConfig: AngularEditorConfig = editorConfig;
  categories: ProjectCategory[];

  private destroy$ = new Subject<void>();

  constructor(
    private projectStore: ProjectStore,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.project$ = this.projectStore.project$.pipe(
      tap((project) => {
        this.breadcrumb = [
          new NavLink('Projects', null, '/projects'),
          new NavLink(project.name, null, '../'),
          new NavLink('Settings', null, './')
        ];
        this.initForm(project);
      })
    );
    this.categories = [ProjectCategory.SOFTWARE, ProjectCategory.BUSINESS];
    this.projectStore.loading$
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((loading) => {
        if (!loading) {
          this.message.create('success', `Update project successfully`)
        }
      });
  }

  initForm(project: Project) {
    this.projectSettingsForm = this.formBuilder.group({
      id: project.id,
      name: [project.name, Validators.required],
      key: [{ value: project.key, disabled: true }, Validators.required],
      description: project.description,
      category: project.category
    });
  }

  onSubmit() {
    const formValue = this.projectSettingsForm.getRawValue();
    const updatedProject: UpdateProjectPayload = {
      id: formValue.id,
      name: formValue.name,
      description: formValue.description,
      category: formValue.category
    };
    this.projectStore.postUpdateProject(updatedProject);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
