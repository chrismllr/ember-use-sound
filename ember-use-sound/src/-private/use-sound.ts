import { Positional, Resource } from 'ember-resources';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { debug } from '@ember/debug';

type Filepath = string;
interface UseSoundOptions {
  id?: string;
  volume?: number;
  playbackRate?: any;
  soundEnabled?: any;
  interrupt?: any;
  onload?: any;
}

export type UseSoundArgs = [Filepath | Filepath[], UseSoundOptions?];

export class UseSound extends Resource<Positional<UseSoundArgs>> {
  declare sound: any;

  constructor(
    owner: any,
    args: Positional<UseSoundArgs>,
    previous: Resource<Positional<UseSoundArgs>>
  ) {
    super(owner, args, previous);

    let howl: any;

    if (!previous) {
      // initial setup

      const [src, options = {}] = args.positional;
      const { volume = 1, playbackRate = 1, onload, ...delegated } = options;

      const handleLoad = () => {
        onload && onload();
        this.sound = howl;
      };

      import('howler').then((mod: any) => {
        howl = new mod.Howl({
          src: Array.isArray(src) ? src : [src],
          volume,
          rate: playbackRate,
          onload: handleLoad,
          onloaderror: () => {
            debug('Error initializing use-sound');
          },
          ...delegated,
        });
      });
    } else {
      // update
    }

    registerDestructor(this, () => {
      this.sound?.unload();
    });
  }

  @action play(options?: UseSoundOptions) {
    const opts = {
      ...(this.args.positional[1] || {}),
      ...(options || {}),
    };

    if (opts.soundEnabled === false) {
      this.sound.stop();
      return;
    }

    if (opts.interrupt) {
      this.sound.stop();
    }

    if (opts.volume) {
      this.sound.volume(opts.volume);
    }

    if (opts.playbackRate) {
      this.sound.rate(opts.playbackRate);
    }

    this.sound.play(opts.id);
  }

  @action stop() {
    this.sound.stop();
  }
}
