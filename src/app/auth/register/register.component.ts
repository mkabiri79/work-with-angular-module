import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isFormValid: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nationalCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        this.isNumber,
      ]),
    });
  }

  private isNumber(control: FormControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }

  public onSubmitRegisterForm() {
    if (this.registerForm.status === 'VALID')
      this.authService.checkUserNationalCodeValidation(this.registerForm.value);

    this.isFormValid =
      this.registerForm.valid && this.authService.isNationalCodeValid;

    this.router.navigate(['login']);
  }

  public canDeactivate() {
    return this.authService.isNationalCodeValid;
  }
}
