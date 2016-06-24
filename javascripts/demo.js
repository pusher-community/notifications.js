var notifications = new Notifications({
  closeAfter: 10000
});

notifications.push('Welcome to Notifications.js');

var demoButton = document.querySelector('.js-demo-button');

demoButton.addEventListener('click', function(e) {
  e.preventDefault();
  notifications.push('This is a new notification!');
});
