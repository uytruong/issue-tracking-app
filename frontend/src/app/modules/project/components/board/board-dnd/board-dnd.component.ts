import { Component, OnInit } from '@angular/core';
import {
  Issue,
  IssuePriority,
  IssueStage,
  IssueType,
} from '@app/data/model/issue.model';

@Component({
  selector: 'app-board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss'],
})
export class BoardDndComponent implements OnInit {
  stages: IssueStage[] = [
    IssueStage.BACKLOG,
    IssueStage.SELECTED,
    IssueStage.IN_PROGRESS,
    IssueStage.DONE,
  ];

  constructor() {}

  ngOnInit(): void {}

}
