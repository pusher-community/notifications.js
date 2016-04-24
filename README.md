# Notifications.js

Coming soon...

# API

```js

var pusher = new Pusher(...);

var notifications = new Notifications({
  // where to place notifications
  targetDOMElement: '#notifications',

  // close after X millseconds
  closeAfter: 5000,

  // how many notifications to show at once:
  showMax: 5,

  // array of classes to give each notification
  notificationClasses: ['my-notification'],

  // function called when a message is closed
  onClose: function(message) {...}

  // function called when a new message is shown
  onShow: function(message) {...}


  // optional, but if set will render notifications
  pusher: {
    instance: pusher,
    channel: 'notifications',
    event: 'new-notification',
    // used to tell Notification.js what string to show in the notification, from the Pusher event
    transform: function(event) {
      return 'New message: ' + event.text;
    }
  }
});

// if you're not using Pusher, you'll get an API to send messages to:
// this will add the new message and immediately show it
notifications.push('This is a new message');

// general API

notifications.getLatest(); // get the latest message
notifications.getAll(); // get an array of all the messages
notifications.clear(); // remove all notifications

notifications.onNewMessage(function() {
  // do something when a new message is added
  // this will be useful for hooking into other libraries (React, etc)
});
```
