import test from 'ava';
import Notifications from '../src/main';

test('it throws if the DOM element is not found', t => {
  t.throws(() => {
    new Notifications({});
  });
});

test('it lets you access the messages', t => {
  const notifications = new Notifications({ shouldRender: false });
  notifications.push('Hello World');
  t.is(notifications.getMessages().length, 1);
});
