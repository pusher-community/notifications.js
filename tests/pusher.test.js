import test from 'ava';
import Notifications from '../src/main';

const fakePusher = {
  subscribe() {
    return {
      bind(_, cb) {
        fakePusher.cb = cb;
      }
    }
  },
  call(data) {
    this.cb(data);
  }
};

test('it responds to events from pusher and creates messages', t => {
  const instance = new Notifications({
    shouldRender: false,
    pusher: {
      instance: fakePusher,
      transform: ({ text }) => text
    }
  });
  fakePusher.call({ text: 'hello' });
  t.is(instance.messages[0].text, 'hello');
});
