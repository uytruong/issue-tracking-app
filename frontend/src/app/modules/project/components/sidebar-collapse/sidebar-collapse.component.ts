import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-collapse',
  templateUrl: './sidebar-collapse.component.html',
  styleUrls: ['./sidebar-collapse.component.scss']
})
export class SidebarCollapseComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() manualToggle = new EventEmitter<void>();

  get icon(): string {
    return this.expanded ? 'left' : 'right';
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.manualToggle.emit();
  }
}
