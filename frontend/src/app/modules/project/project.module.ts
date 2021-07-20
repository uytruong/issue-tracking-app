import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './project.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from '@app/core/configs/icons';
import { SidebarCollapseComponent } from './components/sidebar-collapse/sidebar-collapse.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { BoardDndComponent } from './components/board/board-dnd/board-dnd.component';
import { BoardDndColumnComponent } from './components/board/board-dnd-column/board-dnd-column.component';
import { IssueCardComponent } from './components/issue/issue-card/issue-card.component';

@NgModule({
  declarations: [
    BoardComponent,
    SettingsComponent,
    ProjectComponent,
    SidebarComponent,
    SidebarCollapseComponent,
    BreadcrumbComponent,
    ContentHeaderComponent,
    BoardDndComponent,
    BoardDndColumnComponent,
    IssueCardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    NzIconModule.forChild(NZ_ICONS),
    NzBreadCrumbModule
  ]
})
export class ProjectModule { }
