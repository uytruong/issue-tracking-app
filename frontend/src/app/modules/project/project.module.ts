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
import { ProjectStore } from './store/project.store';
import { IssueTitleComponent } from './components/issue/issue-title/issue-title.component';
import { IssueDescriptionComponent } from './components/issue/issue-description/issue-description.component';
import { FormsModule } from '@angular/forms';
import { IssueStageComponent } from './components/issue/issue-stage/issue-stage.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IssueAssigneeComponent } from './components/issue/issue-assignee/issue-assignee.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IssueReporterComponent } from './components/issue/issue-reporter/issue-reporter.component';
import { IssuePriorityComponent } from './components/issue/issue-priority/issue-priority.component';
import { IssueCommentComponent } from './components/issue/issue-comment/issue-comment.component';
import { IssueAddModalComponent } from './components/issue/issue-add-modal/issue-add-modal.component';
import { IssueSelectTypeComponent } from './components/issue/issue-add-modal/issue-select-type/issue-select-type.component';
import { IssueSelectPriorityComponent } from './components/issue/issue-add-modal/issue-select-priority/issue-select-priority.component';
import { IssueSelectReporterComponent } from './components/issue/issue-add-modal/issue-select-reporter/issue-select-reporter.component';
import { IssueSelectAssigneesComponent } from './components/issue/issue-add-modal/issue-select-assignees/issue-select-assignees.component';
import { FilterStore } from './store/filter.store';
import { BoardDndActionsComponent } from './components/board/board-dnd-actions/board-dnd-actions.component';
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
    IssueStageComponent,
    IssueAssigneeComponent,
    IssueReporterComponent,
    IssuePriorityComponent,
    IssueCommentComponent,
    IssueAddModalComponent,
    IssueSelectTypeComponent,
    IssueSelectPriorityComponent,
    IssueSelectReporterComponent,
    IssueSelectAssigneesComponent,
    BoardDndActionsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    SharedModule,
    NzBreadCrumbModule,
    DragDropModule,
    NzSelectModule,
    NzDropDownModule
  ],
  providers: [ProjectStore, FilterStore]
})
export class ProjectModule {}
