import { Injectable } from '@angular/core';

import { IUser } from './Model/model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isNationalCodeValid: boolean = false;
  constructor() {}
  public checkUserNationalCodeValidation(User: IUser) {
    this.isNationalCodeValid = false;
    const nationalCode = User.nationalCode;
    if (nationalCode === null) return;

    let reverseNationalCode: string[] = nationalCode.split('').reverse();

    while (reverseNationalCode.length < 10) {
      reverseNationalCode.unshift('0');
    }

    const controlNumber = +reverseNationalCode[0];

    reverseNationalCode = reverseNationalCode.slice(1);

    let sum = 0;

    reverseNationalCode.map((number: string, index: number) => {
      sum = sum + +number * (index + 2);
    });

    const remainder = sum % 11;

    if (
      (remainder < 2 && controlNumber === remainder) ||
      (remainder >= 2 && controlNumber === 11 - remainder)
    ) {
      this.isNationalCodeValid = true;
    }
  }
}
