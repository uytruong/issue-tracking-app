import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@app/core/constant/project-const';

@Component({
  selector: 'app-board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent implements OnInit {
  stages: string[] = ProjectConst.ProcessStages;

  constructor() { }

  ngOnInit(): void {
  }

}
