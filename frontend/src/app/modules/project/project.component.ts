import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectConst } from '@app/core/constant/project-const';
import { Project } from '@app/data/model/project';
import { Observable } from 'rxjs';
import { ProjectStore } from './project.store';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ProjectStore]
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  projectKey: string;

  constructor(private route: ActivatedRoute, private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.expanded = true;
    this.projectKey = this.route.snapshot.paramMap.get(ProjectConst.ProjectKey);
    this.projectStore.getProject(this.projectKey);
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
