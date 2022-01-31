import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { IUser } from '../Model/model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nationalCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        this.isNumber,
      ]),
    });

    this.registerForm.valueChanges.subscribe((user: IUser) => {
      if (this.registerForm.status === 'VALID') {
        this.authService.checkUserNationalCodeValidation(user);
      }
    });
  }

  private isNumber(control: FormControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }
}
