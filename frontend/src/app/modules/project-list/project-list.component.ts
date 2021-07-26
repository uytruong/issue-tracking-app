import { Component, OnInit } from '@angular/core';
import { login } from '@app/core/store/auth/auth.actions';
import { loadingSelector, userSelector } from '@app/core/store/auth/auth.selectors';
import { User } from '@app/data/model/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
