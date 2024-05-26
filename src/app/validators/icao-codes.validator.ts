import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * This validator checks if the input string contains only ICAO codes separated by spaces
 * @param {AbstractControl} control The form control to validate
 * @returns {ValidationErrors | null} The validation error or null if the input is valid
 * @author Michal Pidanic
 */
export const icaoCodesValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value as string;
  const icaoCodePattern = /^[A-Z]{4}$/;
  const codes = value.split(' ');
  const allValid = codes.every((code) => icaoCodePattern.test(code));

  if (!value || value === '') {
    return null;
  }

  if (!allValid) {
    const error = { invalidICAOCode: 'One or more ICAO codes are invalid.' };
    control.setErrors(error);
    return error;
  } else {
    control.setErrors(null);
    return null;
  }
};
