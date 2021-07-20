import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-dnd-column',
  templateUrl: './board-dnd-column.component.html',
  styleUrls: ['./board-dnd-column.component.scss']
})
export class BoardDndColumnComponent implements OnInit {
  @Input() stageTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
