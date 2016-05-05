import test from 'ava';
import { Double } from 'doubler';
import Notifications from '../src/main';

test('Animate.css usage is on by default', t => {
  const instance = new Notifications();
  t.true(instance.config.animations.on);
});


test('You can push a notification to add it to the list', t => {
  const instance = new Notifications({ shouldRender: false });
  instance.push('hello');
  t.deepEqual(instance.messages[0].text, 'hello');
});

test('the notification element gets the classes in the config', t => {
  const instance = new Notifications({
    notificationClasses: ['a', 'b'],
    shouldRender: false
  });
  instance.push('hello');
  t.true(instance.messages[0].element.classList.contains('a'));
  t.true(instance.messages[0].element.classList.contains('b'));
});

test('it uses the given template function to generate the HTML', t => {
  const instance = new Notifications({
    template: () => 'Hello World',
    shouldRender: false
  });
  instance.push('hello');
  t.is(instance.messages[0].element.innerHTML, 'Hello World');
});

test('you can apply CSS on a per message basis', t => {
  const instance = new Notifications({ shouldRender: false });
  instance.push('hello', {
    classes: ['warning']
  });

  t.true(instance.messages[0].element.classList.contains('warning'));
});

test('onNewMessage is called with the new message', t => {
  const fn = Double.function();
  const instance = new Notifications({
    shouldRender: false,
    onNewMessage: fn
  });
  instance.push('hello');

  t.is(fn.callCount, 1);
  t.is(fn.args[0][0].text, 'hello');
});
