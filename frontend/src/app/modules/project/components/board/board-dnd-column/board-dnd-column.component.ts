import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { issueStageDisplay } from '@app/core/configs/issue';
import { Issue, IssueStage } from '@app/data/model/issue.model';
import { ProjectStore } from '@app/modules/project/project.store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-board-dnd-column',
  templateUrl: './board-dnd-column.component.html',
  styleUrls: ['./board-dnd-column.component.scss']
})
export class BoardDndColumnComponent implements OnInit {
  @Input() stage: IssueStage;
  issues$: Observable<Issue[]>;
  stageDisplay = issueStageDisplay;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.issues$ = this.projectStore.issuesSortedByStage$(this.stage);
  }

  drop(event: CdkDragDrop<Issue[]>) {
    const movedIssue: Issue = { ...event.item.data };
    let newIssues = [...event.container.data];
    const previousIssues = [...event.previousContainer.data];
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    } else {
      transferArrayItem(previousIssues, newIssues, event.previousIndex, event.currentIndex);
      newIssues = newIssues.map((issue) =>
        issue.id === movedIssue.id ? { ...issue, stage: event.container.id as IssueStage } : issue
      );
      this.updateListPosition(previousIssues);
      this.updateListPosition(newIssues);
    }
  }

  private updateListPosition(issues: Issue[]) {
    for (let idx in issues) {
      issues[idx].listPosition = parseInt(idx) + 1;
      this.projectStore.updateIssue(issues[idx]);
    }
  }
}
