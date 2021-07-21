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

}
