import { Component, OnInit } from '@angular/core';
import { login } from '@app/core/store/auth/auth.actions';
import { loadingSelector, userSelector } from '@app/core/store/auth/auth.selectors';
import { User } from '@app/data/model/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  user$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(login({username: 'uytruong', password: '123456'}));
    this.user$ = this.store.pipe(select(userSelector));
    this.loading$ = this.store.pipe(select(loadingSelector), tap(value => console.log(value)));
    console.log(this.loading$);
  }

}
