import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './project.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from '@configs/icons';

@NgModule({
  declarations: [
    BoardComponent,
    SettingsComponent,
    ProjectComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    NzIconModule.forChild(NZ_ICONS),
  ]
})
export class ProjectModule { }
