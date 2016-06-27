import { onAnimationEnd } from './animate';

let indexCount = 0;

class Message {
  constructor({
    text,
    target,
    template,
    notificationClasses,
    animations,
    onClose = () => {},
    closeAfter,
    shouldRender
  }) {
    this.rendered = false;
    this.removed = false;
    this.target = target;
    this.onClose = onClose;
    this.closeAfter = closeAfter;
    this.animations = animations;
    this.notificationClasses = notificationClasses;
    this.text = text;
    this.index = indexCount++;
    this.shouldRender = shouldRender;

    this.element = this.makeElement({
      template,
      notificationClasses,
      animations,
      text,
      index: this.index
    });
  }

  makeElement({
    template,
    notificationClasses,
    animations,
    text,
    index
  }) {
    const div = document.createElement('div');

    div.setAttribute('data-notifications-index', index);
    div.classList.add(...notificationClasses);

    if (this.animations.on) {
      div.classList.add('animated', animations.animateInClasses);
    }

    div.innerHTML = template({ text });

    return div;
  }

  bindOnClose() {
    const close = document.querySelector(`[data-notifications-index="${this.index}"] [data-notifications-close]`);
    close.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.remove();
      this.onClose();
    });
  }

  render() {
    if (this.rendered === false) {
      if (this.shouldRender) {
        this.target.insertBefore(this.element, this.target.firstChild);
        this.rendered = true;
        this.bindOnClose();
      }

      if (this.closeAfter !== 0) {
        setTimeout(() => {
          this.remove();
          this.onClose();
        }, this.closeAfter);
      }
    }
  }

  remove() {
    if (!this.removed && this.shouldRender) {

      onAnimationEnd(this.element, () => {
        if (!this.removed) this.target.removeChild(this.element);
        this.removed = true;
      });

      this.element.classList.add(...this.animations.animateOutClasses);
    }
  }
}

export default Message;
