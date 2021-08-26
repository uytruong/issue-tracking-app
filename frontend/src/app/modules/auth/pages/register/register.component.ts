import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { register } from '@app/core/store/auth/auth.actions';
import { errorSelector, successSelector } from '@app/core/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(/^[a-z0-9]{6,32}$/i)
        ]
      ],
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+$/i)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i),
          this.confirmPasswordValidator()
        ]
      ]
    });
    this.registerForm.controls['password'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      });

    this.store.pipe(select(errorSelector), takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.message.error(error);
      }
    });
    this.store.pipe(select(successSelector), takeUntil(this.destroy$)).subscribe((success) => {
      if (success) {
        this.message.success(success);
        this.registerForm.reset();
      }
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const formValue = this.registerForm.getRawValue();
    let { confirmPassword, ...payload } = formValue;
    this.store.dispatch(register({ registerPayload: payload }));
  }

  private confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isMatch = control.value === this.registerForm?.controls['password'].value;
      return isMatch ? null : { confirm: true };
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
