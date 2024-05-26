import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * This validator checks if the input string contains only WMO codes separated by spaces
 * @param {AbstractControl} control The form control to validate
 * @returns {ValidationErrors | null} The validation error or null if the input is valid
 * @author Michal Pidanic
 */
export const wmoCodesValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value as string;
  const wmoCodePattern = /^[A-Z]{2}$/;
  const codes = value.split(' ');
  const allValid = codes.every((code) => wmoCodePattern.test(code));

  if (!value || value === '') {
    return null;
  }

  if (!allValid) {
    const error = { invalidWMOCode: 'One or more WMO codes are invalid.' };
    control.setErrors(error);
    return error;
  } else {
    control.setErrors(null);
    return null;
  }
};
