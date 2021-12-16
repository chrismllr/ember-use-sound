import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { useSound } from 'ember-use-sound';

module('useSound', function () {
  module('in templates', function (hooks) {
    setupRenderingTest(hooks);

    test('it works', async function (assert) {
      class Test extends Component {
        popDown = useSound(this, () => [
          '/assets/pop-down.mp3',
          {
            volume: 0.4,
          },
        ]);

        popUp = useSound(this, () => [
          '/assets/pop-up-off.mp3',
          {
            volume: 0.4,
          },
        ]);
      }

      const TestComponent = setComponentTemplate(
        hbs`
          <button
            type='button'
            {{on 'mousedown' this.popDown.play}}
            {{on 'mouseup' this.popUp.play}}
          >
            Click here
          </button>
        `,
        Test
      );

      this.setProperties({ TestComponent });

      await render(hbs`<this.TestComponent />`);
      await click('button');

      assert.ok(true);
    });
  });
});
