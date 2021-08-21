import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectListComponent } from './project-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProjectCreateModalComponent } from './components/project-create-modal/project-create-modal.component';
import { ProjectListStore } from './project-list.store';

@NgModule({
  declarations: [ProjectListComponent, ProjectCreateModalComponent],
  imports: [CommonModule, ProjectListRoutingModule, SharedModule],
  providers: [ProjectListStore]
})
export class ProjectListModule {}
