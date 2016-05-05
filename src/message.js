import { onAnimationEnd } from './animate';

class Message {
  constructor({
    text,
    target,
    template,
    notificationClasses,
    animations,
    onClose = () => {},
    closeAfter
  }) {
    this.rendered = false;
    this.removed = false;
    this.target = target;
    this.onClose = onClose;
    this.closeAfter = closeAfter;
    this.animations = animations;
    this.notificationClasses = notificationClasses;

    this.element = this.makeElement({
      template,
      notificationClasses,
      animations,
      text
    });
  }

  makeElement({
    template,
    notificationClasses,
    animations,
    text
  }) {
    const div = document.createElement('div');

    div.classList.add(...notificationClasses);

    if (this.animations.on) {
      div.classList.add('animated', animations.animateInClasses);
    }

    div.innerHTML = template({ text });

    return div;
  }

  bindOnClose() {
    const close = document.querySelector('[data-notifications-close]');
    close.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.remove();
      this.onClose();
    });
  }

  render() {
    if (this.rendered === false) {
      this.target.insertBefore(this.element, this.target.firstChild);
      this.rendered = true;
      this.bindOnClose();

      if (this.closeAfter !== 0) {
        setTimeout(() => {
          this.remove();
          this.onClose();
        }, this.closeAfter);
      }
    }
  }

  remove() {
    if (!this.removed) {

      onAnimationEnd(this.element, () => {
        this.removed = true;
        this.target.removeChild(this.element);
      });

      this.element.classList.add(...this.animations.animateOutClasses);
    }
  }
}

export default Message;
