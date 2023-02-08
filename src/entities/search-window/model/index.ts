import { attach, createEvent, createStore, restore, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import { commonApi } from 'shared/api';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 500;

export const searchWindow = createToggler();
export const searchByNameFx = attach({ effect: commonApi.searchByName });
export const $searchResult = restore(searchByNameFx, null);
export const searchChanged = createEvent<string>();

export const $search = createStore('').on(searchChanged, (_, payload) => payload);
export const $debouncedValue = createStore('');

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  clock: debouncedSearchChanged,
  target: [searchByNameFx, $debouncedValue],
});

export const $pending = createStore<boolean>(false);

sample({
  clock: searchByNameFx.pending,
  target: $pending,
});
