import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ProjectRoutingModule } from './project-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './project.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { SidebarCollapseComponent } from './components/sidebar-collapse/sidebar-collapse.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { BoardDndComponent } from './components/board/board-dnd/board-dnd.component';
import { BoardDndColumnComponent } from './components/board/board-dnd-column/board-dnd-column.component';
import { IssueCardComponent } from './components/issue/issue-card/issue-card.component';
import { IssueDetailModalComponent } from './components/issue/issue-detail-modal/issue-detail-modal.component';
import { ProjectStore } from './project.store';

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
    IssueCardComponent,
    IssueDetailModalComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    NzBreadCrumbModule,
    DragDropModule
  ],
  providers: [ProjectStore]
})
export class ProjectModule { }
