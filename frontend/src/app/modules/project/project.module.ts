import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
