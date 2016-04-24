import merge from 'lodash/merge';
import Message from './message';

const DEFAULT_OPTIONS = {
  targetDOMElement: '#notifications',
  closeAfter: 5000,
  showMax: 5,
  notificationClasses: ['notification'],
  onClose: () => {},
  onShow: () => {},
  pusher: {
    instance: null,
    channelName: '',
    eventName: '',
    transform: () => 'Configure `pusher.transform`'
  }
};

class Notifications {
  constructor(options) {
    this.config = merge({}, DEFAULT_OPTIONS, options);
    this.messages = [];
    this.targetElement = document.querySelector(this.config.targetDOMElement);
  }

  push(data) {
    if (typeof data === 'string') {
      const message = new Message({
        string: data,
        index: this.messages.length,
        target: this.targetElement
      });
      this.messages.push(message);
      message.render();
      this.removeOldMessages();
    } else {
      // presume we've got a DOM Element
    }
  }

  removeOldMessages() {
    if (this.messages.length > this.config.showMax) {
      const maxIndexToDelete = this.messages.length - this.config.showMax;

      for (let i = 0; i < maxIndexToDelete; i++) {
        this.messages[i].remove();
      }
    }
  }
}

// use this so it gets exported correctly as a global
// without the need for Notifications.default
module.exports = Notifications
