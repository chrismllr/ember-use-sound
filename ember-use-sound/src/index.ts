import { Positional, useResource } from 'ember-resources';
import { UseSound } from './-private/use-sound';
import type { UseSoundArgs } from './-private/use-sound';

// @public
export function useSound(
  destroyable: any,
  thunk: () => Positional<UseSoundArgs>
) {
  return useResource(destroyable, UseSound, thunk);
}