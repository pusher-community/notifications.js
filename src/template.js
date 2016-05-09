const template = function({ text }) {
  return `
  <div>
    ${text}

    <button class="notification__close" data-notifications-close>&times;</button>
  </div>
  `;
};

export default template;
