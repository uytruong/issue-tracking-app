import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() isLoginForm: boolean;
  @Input() prefixIcon: string = '';
  @Input() label: string = '';
  passwordVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
