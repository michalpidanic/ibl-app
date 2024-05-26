import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

/**
 * This validator checks if at least one of the specified form controls has a value
 * @param {string[]} controlNames The names of the form controls to check
 * @returns {ValidatorFn} The validator function
 * @author Michal Pidanic
 */
export const atLeastOneRequiredValidator = (
  controlNames: string[]
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const selected = controlNames.some(
      (controlName) => !!formGroup.get(controlName)?.value
    );

    if (control!.errors && !control!.errors?.['atLeastOneRequired']) {
      return null;
    }

    if (!selected) {
      const error = { atLeastOneRequired: 'At least one field is required.' };
      control.setErrors(error);
      return error;
    } else {
      control.setErrors(null);
      return null;
    }
  };
};
