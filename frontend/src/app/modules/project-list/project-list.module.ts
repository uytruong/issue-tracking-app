import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectListComponent } from './project-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProjectCreateModalComponent } from './components/project-create-modal/project-create-modal.component';
import { ProjectListStore } from './project-list.store';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProjectSelectUsersComponent } from './components/project-select-users/project-select-users.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectCreateModalComponent, ProjectSelectUsersComponent],
  imports: [CommonModule, ProjectListRoutingModule, SharedModule, NzDividerModule, NzPopconfirmModule],
  providers: [ProjectListStore]
})
export class ProjectListModule {}
