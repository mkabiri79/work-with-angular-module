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
    let val = control.value;

    if (val === null) return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }

  public onSubmitRegisterForm() {
    //passing data to service
    this.authService.checkUserNationalCodeValidation(this.registerForm.value);
    //checking form validation
    this.isFormValid = this.registerForm.valid && this.isNationalCodeValid;

    //navigate to login
    this.router.navigate(['login']);
    this.registerForm.reset();
  }
}
