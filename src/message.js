class Message {
  constructor({ string, element, index, target }) {
    this.rendered = false;
    this.removed = false;

    this.index = index;
    this.target = target;

    if (string) {
      const div = document.createElement('div');
      const text = document.createTextNode(string);
      div.setAttribute('data-notification-index', index);
      div.appendChild(text);
      this.element = div;
    } else if (element) {
      this.element = element;
    } else {
      throw "Message must be given a string or an element";
    }
  }

  render() {
    this.target.insertBefore(this.element, this.target.firstChild);
    this.rendered = true;
  }

  remove() {
    if (!this.removed) {
      this.removed = true;
      this.target.removeChild(this.element);
    }
  }
}

export default Message;
