import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { issueStageDisplay } from '@app/core/configs/issue';
import { Issue, IssueStage } from '@app/data/model/issue';
import { ProjectStore } from '@app/modules/project/project.store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-board-dnd-column',
  templateUrl: './board-dnd-column.component.html',
  styleUrls: ['./board-dnd-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
 })
export class BoardDndColumnComponent implements OnInit {
  @Input() stage: IssueStage;
  issues$: Observable<Issue[]>;
  stageDisplay = issueStageDisplay;

  constructor(private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.issues$ = this.projectStore.issuesSortedByStage$(this.stage);
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      this.issues$.pipe(tap(issue => console.log(issue)));
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('[current] container data: ', this.issues$.pipe(tap(issue => console.log(issue))));
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
