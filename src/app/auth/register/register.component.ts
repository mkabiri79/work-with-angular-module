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
  isNationalCodeValid!: boolean;
  alertMassege!: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isNationalCodeValid = this.authService.isNationalCodeValid;
    this.registerForm = new FormGroup({
      nationalCode: new FormControl(null, [
        Validators.required,
        this.hasCorrectLength,
        this.isNummber,
      ]),
    });
  }

  private hasCorrectLength(control: FormControl) {
    const value: string = control.value;
    if (value === null) return { invalidLength: true };
    if (value.length > 7 && value.length < 11) {
      return null;
    }
    return { invalidLength: true };
  }

  private isNummber(control: FormControl) {
    const value = control.value;
    if (value === null) return null;

    if (!value.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }

  private findErrorType(error: string) {
    return this.registerForm.get('nationalCode')?.hasError(error);
  }

  private findErrorMassege() {
    this.alertMassege = 'Invalid Notional code';
    if (this.findErrorType('invalidLength'))
      this.alertMassege = 'Should be between 8 and 10 char';
    if (this.findErrorType('invalidNumber'))
      this.alertMassege = 'Should be number';
    if (this.findErrorType('required')) this.alertMassege = 'Required';
  }

  private checkingFormValidation() {
    this.findErrorMassege();
    this.isFormValid = this.registerForm.valid && this.isNationalCodeValid;
  }

  private passingNationalCodetoService() {
    this.authService.checkUserNationalCodeValidation(this.registerForm.value);
  }

  public onSubmitRegisterForm() {
    this.passingNationalCodetoService();

    this.checkingFormValidation();

    console.log();

    //navigate to login
    this.router.navigate(['login']);
    this.registerForm.reset();
  }
}
