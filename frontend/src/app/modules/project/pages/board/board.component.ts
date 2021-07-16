import { Component, OnInit } from '@angular/core';
import { NavLink } from '@app/data/ui-model/nav-link';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ProjectConst } from '@app/core/constant/project-const';
import { RouteUtil } from '@app/core/utils/route';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
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
      new NavLink('Kanban Board', null, './'),
    ];
  }
}
