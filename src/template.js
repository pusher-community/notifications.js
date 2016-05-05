const template = function({ text }) {
  return `
  <div>
    ${text}

    <a href="" class="notification-close" data-notifications-close>&times;</a>
  </div>
  `;
};

export default template;
