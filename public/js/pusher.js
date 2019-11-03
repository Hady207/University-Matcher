// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('a236988296f8ac430c8e', {
  cluster: 'ap2',
  forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(JSON.stringify(data));
});
