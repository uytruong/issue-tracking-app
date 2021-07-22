import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { issueStageDisplay } from '@app/core/configs/issue';
import { Issue, IssueStage } from '@app/data/model/issue';

@Component({
  selector: 'app-board-dnd-column',
  templateUrl: './board-dnd-column.component.html',
  styleUrls: ['./board-dnd-column.component.scss']
})
export class BoardDndColumnComponent implements OnInit {
  @Input() stage: IssueStage;
  @Input() issues: Issue[];
  stageDisplay = issueStageDisplay;

  constructor() { }

  ngOnInit(): void {
  }

  bodyElement: HTMLElement = document.body;

  // Adding cursor while dragging
  dragStart(event: CdkDragStart) {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'grabbing';
  }

  drop(event: CdkDragDrop<Issue[]>) {
    console.log('event: ', event);
    console.log('is event data issue list: ', event.container.data === this.issues);
    if (event.previousContainer === event.container) {
      console.log('[prev] container data: ', event.container.data);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('[current] container data: ', event.container.data);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
