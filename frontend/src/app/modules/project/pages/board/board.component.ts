import { Component, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumb: NavLink[] = [
    new NavLink('Projects', null, '/projects'),
    new NavLink('Project Name', null, '../'),
    new NavLink('Kanban Board', null, './'),
  ] 
  constructor() { }

  ngOnInit(): void {
  }

}
