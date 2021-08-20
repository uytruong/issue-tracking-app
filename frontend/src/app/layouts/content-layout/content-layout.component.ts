import { Component, OnInit } from '@angular/core';
import { login } from '@app/core/store/auth/auth.actions';
import { loadingSelector, userSelector } from '@app/core/store/auth/auth.selectors';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  user$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store.dispatch(autoLogin());
    this.user$ = this.store.pipe(select(userSelector));
    this.loading$ = this.store.pipe(select(loadingSelector));
  }
}
