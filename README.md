# ember-use-sound

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

## Example

```ts
import { Component } from '@glimmer/component';
import { useSound } from 'ember-use-sound';

class Button extends Component {
  sfx = useSound(this, () => ({
    positional: [
      ['/assets/pop-in.mp3', '/assets/pop-out.mp3']
    ]
  }));
}
```

```hbs
<button 
  type='button'
  {{on 'mousedown' this.sfx.play('/assets/pop-in.mp3')}}  
  {{on 'mouseup' this.sfx.play('/assets/pop-out.mp3')}}  
>
  Click me!
</button>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
