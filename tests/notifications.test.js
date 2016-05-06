import test from 'ava';
import Notifications from '../src/main';

test('it throws if the DOM element is not found', t => {
  t.throws(_ => {
    new Notifications({});
  });
});
