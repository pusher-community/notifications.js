import merge from 'lodash/merge';
import Message from './message';

import notificationTemplate from './template';
import { onAnimationEnd } from './animate';

const DEFAULT_OPTIONS = {
  targetDOMElement: '#notifications',
  closeAfter: 5000,
  notificationClasses: ['notification'],
  animations: {
    on: true,
    animateInClasses: ['fadeIn'],
    animateOutClasses: ['fadeOut']
  },
  onClose: () => {},
  onShow: () => {},
  onNewMessage: (message) => {},
  pusher: {
    instance: null,
    channelName: '',
    eventName: '',
    transform: () => 'Configure `pusher.transform`'
  },
  template: notificationTemplate,
  shouldRender: true
};

class Notifications {
  constructor(options) {
    this.config = merge({}, DEFAULT_OPTIONS, options);
    this.messages = [];
    this.targetElement = document.querySelector(this.config.targetDOMElement);
    this.templateFn = this.config.template

    if (!!this.config.pusher.instance) {
      this.bindPusher(this.config.pusher);
    }
  }

  bindPusher({ instance, channelName, eventName, transform }) {
    const channel = instance.subscribe(channelName);
    channel.bind(eventName, (data) => {
      this.createNewMessage(transform(data));
    });
  }

  createNewMessage(text) {
    const message = new Message({
      text,
      target: this.targetElement,
      template: this.templateFn,
      notificationClasses: this.config.notificationClasses,
      onClose: this.config.onClose,
      closeAfter: this.config.closeAfter,
      animations: this.config.animations
    });

    this.messages.push(message);
    this.config.onNewMessage(message);

    if (this.config.shouldRender) {
      message.render();
      this.config.onShow(message);
    }
  }

  push(text) {
    this.createNewMessage(text);
  }
}

// use this so it gets exported correctly as a global
// without the need for Notifications.default
module.exports = Notifications
