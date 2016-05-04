import merge from 'lodash/merge';

import template from 'lodash/template';
import Message from './message';

import notificationTemplate from 'raw!./template.html';
import { onAnimationEnd } from './animate';

const DEFAULT_OPTIONS = {
  targetDOMElement: '#notifications',
  closeAfter: 5000,
  notificationClasses: ['notification'],
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
    this.templateFn = template(this.config.template);
  }

  push(data) {
    const message = new Message({
      string: data,
      target: this.targetElement,
      template: this.templateFn,
      notificationClasses: this.config.notificationClasses,
      onClose: this.config.onClose,
      closeAfter: this.config.closeAfter
    });

    this.messages.push(message);
    this.config.onNewMessage(message);

    if (this.config.shouldRender) {
      message.render();
      this.config.onShow(message);
    }
  }
}

// use this so it gets exported correctly as a global
// without the need for Notifications.default
module.exports = Notifications
