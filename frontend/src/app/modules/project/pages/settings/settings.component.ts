import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectConst } from '@app/core/constant/project-const';
import { RouteUtil } from '@app/core/utils/route';
import { NavLink } from '@app/data/ui-model/nav-link.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  breadcrumb: NavLink[] = [
    new NavLink('Projects', null, '/projects')
  ];
  projectKey: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const params = RouteUtil.collectRouteParams(this.router);
    this.projectKey = params[`${ProjectConst.ProjectKey}`];
    this.breadcrumb = [
      ...this.breadcrumb,
      new NavLink(this.projectKey, null, '../'),
      new NavLink('Settings', null, './'),
    ];
  }

}
