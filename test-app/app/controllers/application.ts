import Controller from '@ember/controller';
import { useSound } from 'ember-use-sound';

export default class Application extends Controller {
  popDown = useSound(this, () => [
    '/assets/pop-down.mp3',
    {
      volume: 0.25,
    },
  ]);

  popUp = useSound(this, () => [
    '/assets/pop-up-off.mp3',
    {
      volume: 0.25,
    },
  ]);
}

declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
