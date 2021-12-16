import { useResource } from 'ember-resources';

import { UseSound } from './-private/use-sound';

import type { UseSoundArgs } from './-private/use-sound';

// @public
export function useSound(destroyable: object, thunk: () => UseSoundArgs) {
  return useResource(destroyable, UseSound, thunk);
}
