import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  expanded: boolean;

  constructor() { }

  ngOnInit(): void {
    this.expanded = true;
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }

}
