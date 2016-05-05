var pusher = new Pusher('2e997f11c3e4baee7fe2');

window.notificationsJs = new Notifications({
  pusher: {
    instance: pusher,
    channelName: 'notifications',
    eventName: 'new-notification',
    transform: (event) => {
      return 'New notification! ' + event.text;
    }
  }
});
window.notificationsJs.push('hello world');
