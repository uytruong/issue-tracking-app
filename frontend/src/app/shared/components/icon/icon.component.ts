import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() bgsize: number = 20;
  @Input() iconSize: number = 12;
  @Input() color: string;
  @Input() bgColor: string;
  @Input() name: string;
  @Input() theme: string;

  constructor() { }

  ngOnInit(): void {
  }

}
