import { Component, Input, OnInit } from '@angular/core';
import { sidebarLinks } from '@app/core/configs/sidebar';
import { NavLink } from '@app/data/ui-model/nav-link.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;
  links: NavLink[];

  get sidebarWidth(): number {
    return this.expanded ? 260 : 16;
  }

  constructor() { }

  ngOnInit(): void {
    this.expanded = true;
    this.links = [...sidebarLinks];
  }

}
