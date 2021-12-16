# ember-use-sound

Add rich sound effects to your interactions in Ember! 

This addon takes large inspiration from the React hook package [`use-sound`](https://github.com/joshwcomeau/use-sound) by Josh Comeau. Be sure to check out this [great article](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) he wrote which summarizes the huge benefits you get by enriching the user experience with a 2nd sensory input.

Utilizes the library [`ember-resources`](https://github.com/NullVoxPopuli/ember-resources) under the hood to provide a Resource for loading and playing sounds via the wonderful [Howler.js](https://github.com/goldfire/howler.js) library.

_This is a [V2-format Addon](https://github.com/emberjs/rfcs/pull/507) with V1 compatibility_

## Compatibility

- ember-source v3.25+
- typeScript v4.2+
- ember-auto-import v2+

## Installation

```bash
npm install ember-use-sound
# or
yarn add ember-use-sound
# or
ember install ember-use-sound
```
## Setup

Any audio file you plan on referencing should be added within the `/public/assets` directory of your ember application. They can then be referenced via relative paths in your code.
## Example

```ts
import { Component } from '@glimmer/component';
import { useSound } from 'ember-use-sound';

class Button extends Component {
  popIn = useSound(this, () => ['/assets/pop-in.mp3']);
  popOut = useSound(this, () => ['/assets/pop-out.mp3']);
}
```

```hbs
<button 
  type='button'
  {{on 'mousedown' this.popIn.play}}
  {{on 'mouseup' this.popOut.play}}  
>
  Click me!
</button>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
