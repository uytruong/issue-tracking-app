import { Component, OnInit } from '@angular/core';
import { logout } from '@app/core/store/auth/auth.actions';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(userSelector));
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
