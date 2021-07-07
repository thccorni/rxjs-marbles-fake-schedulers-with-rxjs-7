import {
  Component,
  Host,
  h,
  State,
  Event,
  EventEmitter,
  Prop,
} from '@stencil/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  tag: 'rxjs-counter',
  shadow: true,
})
export class RxjsCounter {
  /** Amount of time in ms the onCountChange event will be debounced. */
  @Prop()
  dueTime = 250;

  @State()
  private _count = 0;

  @Event()
  countChange: EventEmitter<number>;

  private countDebouncer$: Subject<number> = new Subject();
  private destroy$: Subject<void> = new Subject();

  componentWillLoad(): void {
    this.countDebouncer$
      .pipe(debounceTime(this.dueTime), takeUntil(this.destroy$))
      .subscribe((count) => {
        this.countChange.emit(count);
        console.log('emitting', { count });
      });
  }

  disconnectedCallback(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  render() {
    return (
      <Host>
        <button aria-label="decrement" onClick={this.handleDecrement}>
          -
        </button>
        {this.count}
        <button aria-label="increment" onClick={this.handleIncrement}>
          +
        </button>
      </Host>
    );
  }

  private handleDecrement = (): void => {
    this.count--;
  };

  private handleIncrement = (): void => {
    this.count++;
  };

  private get count(): number {
    return this._count;
  }

  private set count(value: number) {
    this._count = value;
    this.countDebouncer$.next(value);
  }
}
