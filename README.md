# Notifications.js

A library for easily adding notifications to a web site or application.

It can be integrated easily with [Pusher](http://pusher.com) but can also be used entirely independently.

It has one dependency, animate.css, and this can be ignored if you wish to provide your own CSS and animations.

Notifications.js is designed to be effortless to set up and easy to customise as required.

# Getting Started

We'll presume for now that you want to use the built in CSS styles that Notifications.js provides. See "Custom CSS" for how to use your own.

You can install NotificationsJS in a number of ways:

1. Grab the built version from the `lib` directory of this repository. NotificationsJS will expose `window.Notifications`. You'll also need to install animate.css and grab `lib/style.css` too.
2. Install through npm: `npm install --save notificationsjs`. This includes animate.css and the default CSS styles.

Now you can create a new instance of Notifications:

```javascript
// require / import Notifications or use the global.
var notifications = new Notifications({
});
```

Finally you need to setup your HTML page.

Include animate.css (`node_modules/animate.css/animate.min.css`) and the default styling (`node_modules/notificationsjs/lib/style.css`) and add a `div` with an ID of `notifications`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Notifications</title>
    <link rel="stylesheet" type="text/css" href="path/to/style.css" />
    <link rel="stylesheet" type="text/css" href="path/to/animate.css" />
  </head>
  <body>
    <div id="notifications"></div>
    <script src="your-javascript.js"></script>
  </body>
</html>
```

Now you can add a notification with the `push` method:

```javascript
// require / import Notifications or use the global.
var notifications = new Notifications({
});
notifications.push('Hello World');
```

If everything is set up correctly you should see the notification fade in, stay for five seconds and then fade out.

You can also [see an example on JSBin](http://jsbin.com/dewiyekoku/edit?html,js,output).

If you'd like an example of using the library through npm and browserify, [check out the getting started repon](https://github.com/pusher-community/notifications.js-getting-started).

# Using Pusher for Notifications

If you want your notifications to be powered by events on a Pusher channel then you can supply the library with your instance of Pusher and tell it which events to listen to:

```javascript
var pusher = new Pusher('YOUR_PUSHER_APP_KEY');

var notifications = new Notifications({
  pusher: {
    instance: pusher,
    channelName: 'notifications',
    eventName: 'new-notification',
    transform: (event) => {
      return 'New notification! ' + event.text;
    }
  }
});
```

You'll need to include Pusher either from npm or using a script tag. NotificationsJS does not include Pusher as a dependency.

# Customising the Notification HTML

NotificationJS ships with a simple template that shows the notification text and a close button. You may wish to customise this, and you can provide a function that will do this. This function takes an object as its argument with a property `text`, which is the text of the notification. It should return a string of HTML. This is one place where ES2015 template strings come in really handy:

```js
var templateFn = function(obj) {
  return `
    <div>
      New! <span>${text}</span>
      <a href="" class="notification-close" data-notifications-close>&times;</a>
    </div>
  `;
};
```

Be sure to add the `data-notifications-close` attribute on the close element so the library can wire up the close event correctly.

You can pass this to NotificationsJS under the `template` option:

```js
new Notifications({
  template: templateFn
});
```

# Full API Documentation

## Configuration Options

These are passed as an object to `new Notification({...})`. The shown values below are the default.

- `targetDOMElement: '#notifications'`: the selector for the containing element that the notifications will be placed in.
- `closeAfter: 5000`: the time in milliseconds before a notification will close itself. Set this to 0 to make notifications never close automatically.
- `animations`: An object with three options:
    - `on: true`: whether to use animate.css to animate items in and out.
    - `animateInClasses: ['fadeIn']`: the classes to apply to animate a notification in.
    - `animateOutClasses: ['fadeOut']`: the classes to apply to animate a notification out
- `onClose: function() {}`: a function called when a notification is closed.
- `onShow: function() {}`: a function called with a notification is shown.
- `onNewMessage: function(message) {}`: a function called when a new message is added. Useful for integrating with other frameworks.
- `template: function({ text }) {}`: a function used to create the HTML string for the contents of the notification. See "Custom templates" documentation above.
- `shouldRender: true`: set this to `false` to stop notifications being rendered, primarily useful if you're using another framework.
- `pusher`: an object with settings for the Pusher integration. See "Using Pusher for Notifications".
    - `instance: null`: the instance of PusherJS.
    - `channelName: ''`: the channel name to listen to
    - `eventName: ''`: the event name to listen for
    - `transform: function(event) {}`: the function that transforms data from a Pusher event into a string for the notification.

      
## API

### `push(text, { classes: [] })`

Once you have created a new instance of the library you can add messages using `push`. This also lets you pass in any classes you'd like applied just to this notification - useful for styling different types of notification differently.

```javascript
var notifications = new Notifications({...});
notifications.push('New message', {
  classes: ['warning']
});
```

## Changelog


### 0.1.1
- builds generated with Rollup
- pass classes into `push` so you can customise classes on a per notification basis

### 0.1.0
- initial release!


