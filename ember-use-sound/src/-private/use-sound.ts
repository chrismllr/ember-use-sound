import { debug } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

import { Resource } from 'ember-resources';

import type { Positional } from 'ember-resources';
import type { Howl } from 'howler';

type Filepath = string;
interface UseSoundOptions {
  id?: string;
  volume?: number;
  playbackRate?: number;
  soundEnabled?: boolean;
  interrupt?: boolean;
  onload?: (soundId: number) => void;
}

export type UseSoundArgs = [Filepath | Filepath[], UseSoundOptions?];

export class UseSound extends Resource<Positional<UseSoundArgs>> {
  sound: Howl | undefined;
  importPromise: Promise<void | Howl> | undefined;

  constructor(
    owner: unknown,
    args: Positional<UseSoundArgs>,
    previous: Resource<Positional<UseSoundArgs>>
  ) {
    super(owner, args, previous);

    let howl: Howl;

    if (!previous) {
      // initial setup

      const [src, options = {}] = args.positional;
      const { volume = 1, playbackRate = 1, onload, ...delegated } = options;

      this.importPromise = import('howler').then((mod: { Howl: typeof Howl }) => {
        return new Promise((res, rej) => {
          howl = new mod.Howl({
            src: Array.isArray(src) ? src : [src],
            volume,
            rate: playbackRate,
            onload: (soundId: number) => {
              onload?.(soundId);
              this.sound = howl;
              res(this.sound);
            },
            onloaderror: () => {
              debug('Error initializing use-sound');
              rej();
            },
            ...delegated,
          });
        });
      });
    } else {
      // update
    }

    registerDestructor(this, () => {
      this.sound?.unload();
    });
  }

  @action async play(options?: UseSoundOptions) {
    // TODO: What's worse -- a sound which doesnt play or a sound which plays late
    await this.importPromise;

    const opts = {
      ...(this.args.positional[1] || {}),
      ...(options || {}),
    };

    if (opts.soundEnabled === false) {
      this.sound?.stop();

      return;
    }

    if (opts.interrupt) {
      this.sound?.stop();
    }

    if (opts.volume) {
      this.sound?.volume(opts.volume);
    }

    if (opts.playbackRate) {
      this.sound?.rate(opts.playbackRate);
    }

    this.sound?.play(opts.id);
  }

  @action stop() {
    this.sound?.stop();
  }
}
