/** eslint-disable */
import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This directive is responsible for disposing subscriptions
 * @author Michal Pidanic
 */
@Directive({
  standalone: true,
})
export abstract class DisposableDirective implements OnDestroy {
  protected destroySignal$ = new Subject<null>();

  /**
   * This method is responsible for disposing subscriptions
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.destroySignal$.next(null);
    this.destroySignal$.complete();
  }
}
