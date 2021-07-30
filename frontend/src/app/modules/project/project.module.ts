import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
import { IssueTitleComponent } from './components/issue/issue-title/issue-title.component';
import { IssueDescriptionComponent } from './components/issue/issue-description/issue-description.component';
import { FormsModule } from '@angular/forms';
import { IssueStageComponent } from './components/issue/issue-stage/issue-stage.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    IssueDetailModalComponent,
    IssueTitleComponent,
    IssueDescriptionComponent,
    IssueStageComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    SharedModule,
    NzBreadCrumbModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    NzSelectModule
  ],
  providers: [ProjectStore]
})
export class ProjectModule {}
