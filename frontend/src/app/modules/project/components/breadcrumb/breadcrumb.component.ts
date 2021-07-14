import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: NavLink[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
