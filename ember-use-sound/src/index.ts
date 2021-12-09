import { useResource } from 'ember-resources';

import { UseSound } from './-private/use-sound';

import type { UseSoundArgs } from './-private/use-sound';
import type { Positional } from 'ember-resources';

// @public
export function useSound(destroyable: object, thunk: () => Positional<UseSoundArgs>) {
  return useResource(destroyable, UseSound, thunk);
}
