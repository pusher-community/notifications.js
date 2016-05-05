import test from 'ava';
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
