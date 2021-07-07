import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { RxjsCounter } from '../rxjs-counter';
import { fakeSchedulers } from 'rxjs-marbles/jest';

describe('rxjs-counter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it(
    'debounces count change event',
    fakeSchedulers(async (advance) => {
      const { root, rootInstance } = await newSpecPage({
        components: [RxjsCounter],
        template: () => <rxjs-counter dueTime={300}></rxjs-counter>,
      });

      const emit = jest.spyOn(rootInstance.countChange, 'emit');
      const button = root.shadowRoot.querySelector<HTMLButtonElement>(
        'button[aria-label="increment"]',
      );

      button.click(); // 1
      button.click(); // 2
      button.click(); // 3
      button.click(); // 4

      expect(emit).not.toBeCalled();

      advance(300);

      expect(emit).toBeCalledTimes(1);
      expect(emit).toBeCalledWith(4);
    }),
  );
});
