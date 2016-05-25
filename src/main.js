import objectAssign from 'object-assign';
import Message from './message';

import notificationTemplate from './template';

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
  onNewMessage: () => {},
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
    this.config = objectAssign({}, DEFAULT_OPTIONS, options);
    this.messages = [];
    this.targetElement = document.querySelector(this.config.targetDOMElement);
    if (!this.targetElement && this.config.shouldRender) {
      throw new Error(`Element with selector ${this.config.targetDOMElement} was not found`);
    }
    this.templateFn = this.config.template;

    if (this.config.pusher.instance) {
      this.bindPusher(this.config.pusher);
    }
  }

  bindPusher({ instance, channelName, eventName, transform }) {
    const channel = instance.subscribe(channelName);
    channel.bind(eventName, (data) => {
      this.createNewMessage(transform(data));
    });
  }

  createNewMessage(text, extraClasses = []) {
    const message = new Message({
      text,
      target: this.targetElement,
      template: this.templateFn,
      notificationClasses: [...this.config.notificationClasses, ...extraClasses],
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

  getMessages() {
    return this.messages;
  }

  push(text, { classes = [] } = {}) {
    this.createNewMessage(text, classes);
  }
}

export default Notifications;
