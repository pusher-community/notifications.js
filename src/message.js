class Message {
  constructor({
    string,
    index,
    target,
    template,
    notificationClasses,
    onClose = () => {},
    closeAfter
  }) {
    this.rendered = false;
    this.removed = false;
    this.target = target;
    this.onClose = onClose;
    this.closeAfter = closeAfter;

    const div = document.createElement('div');
    div.classList.add(...notificationClasses);
    div.innerHTML = template({ text: string });
    this.element = div;
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
      this.removed = true;
      this.target.removeChild(this.element);
    }
  }
}

export default Message;
