import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DisposableDirective } from './directives/disposable.directive';
import { atLeastOneRequiredValidator } from './validators/at-least-one-required.validator';
import { icaoCodesValidator } from './validators/icao-codes.validator';
import { wmoCodesValidator } from './validators/wmo-codes.validator';
import { map, take } from 'rxjs';
import { BriefingService } from './services/briefing.service';
import { IBriefingResponse } from './interfaces/response.interface';

/**
 * This component is responsible for the main application logic
 * @author Michal Pidanic
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends DisposableDirective {
  public flightBriefingForm = new FormGroup(
    {
      messageType: new FormGroup(
        {
          metar: new FormControl<boolean>(false),
          sigmet: new FormControl<boolean>(false),
          taf: new FormControl<boolean>(false),
        },
        { validators: atLeastOneRequiredValidator(['metar', 'sigmet', 'taf']) }
      ),
      airports: new FormControl<string>('', icaoCodesValidator),
      countries: new FormControl<string>('', wmoCodesValidator),
    },
    { validators: atLeastOneRequiredValidator(['airports', 'countries']) }
  );
  public briefingResponse: IBriefingResponse | null = null;

  /**
   * AppComponent constructor
   * @param {BriefingService} briefingService Briefing service
   */
  constructor(private readonly briefingService: BriefingService) {
    super();
  }

  /**
   * This getter returns the selected message types
   * @returns {string[]} The selected message types
   */
  get selectedMessageTypes(): string[] {
    const messageTypes: string[] = [];
    const messageTypeGroup = this.flightBriefingForm.get(
      'messageType'
    ) as FormGroup;

    if (messageTypeGroup) {
      Object.keys(messageTypeGroup.controls).forEach((key) => {
        if (messageTypeGroup.get(key)?.value) {
          messageTypes.push(key.toUpperCase());
        }
      });
    }

    return messageTypes;
  }

  /**
   * This getter returns the selected airports
   * @returns {string[]} The selected airports
   */
  get selectedAirports(): string[] {
    const value = this.flightBriefingForm.get('airports')?.value as string;

    if (value && value.length) {
      return value.split(' ');
    }

    return [];
  }

  /**
   * This getter returns the selected countries
   * @returns {string[]} The selected countries
   */
  get selectedCountries(): string[] {
    const value = this.flightBriefingForm.get('countries')?.value as string;

    if (value && value.length) {
      return value.split(' ');
    }

    return [];
  }

  /**
   * This method is called when the form is submitted
   * @returns {void}
   */
  public onSubmit(): void {
    if (!this.flightBriefingForm.invalid) {
      const payload = {
        id: crypto.randomUUID(),
        method: 'query',
        params: [
          {
            id: crypto.randomUUID(),
            reportTypes: this.selectedMessageTypes,
            stations: this.selectedAirports,
            countries: this.selectedCountries,
          },
        ],
      };

      this.briefingService
        .createBriefing(payload)
        .pipe(
          take(1),
          map((res) => (this.briefingResponse = res))
        )
        .subscribe();
    }
  }
}
