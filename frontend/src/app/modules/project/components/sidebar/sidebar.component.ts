import { Component, Input, OnInit } from '@angular/core';
import { sidebarLinks } from '@app/core/configs/sidebar';
import { Project } from '@app/data/model/project.model';
import { NavLink } from '@app/data/ui-model/nav-link.model';
import { Observable } from 'rxjs';
import { ProjectStore } from '../../store/project.store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;
  links: NavLink[];
  project$: Observable<Project>;

  get sidebarWidth(): number {
    return this.expanded ? 260 : 16;
  }

  constructor(private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.expanded = true;
    this.links = [...sidebarLinks];
    this.project$ = this.projectStore.project$;
  }

}
