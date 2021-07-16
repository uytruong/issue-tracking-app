import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  @Input() breadcrumb: NavLink[];
  @Input() projectName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
