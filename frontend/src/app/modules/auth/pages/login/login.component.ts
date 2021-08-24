import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '@app/core/store/auth/auth.actions';
import { errorSelector } from '@app/core/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private destroy$ = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store.pipe(select(errorSelector), takeUntil(this.destroy$)).subscribe(
      (error) => {
        if (error) {
          this.message.error(error);
        }
      }
    );
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(/^[a-z0-9]{6,32}$/i)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i)
        ]
      ],
      remember: false
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const formValue = this.loginForm.getRawValue();
    this.store.dispatch(login({ username: formValue.username, password: formValue.password }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
