window.notificationsJs = new Notifications({
  closeAfter: 0,
  onClose: () => console.log('I closed')
});
window.notificationsJs.push('hello world');
