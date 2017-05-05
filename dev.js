const budo = require('budo');
const path = require('path');

let wss;

const app = budo({
  stream: process.stdout,
  serve: 'bundle.js'
});

// enable LiveReload client instrumentation
app.live({
  // If we are making frequent changes to ./live.js
  // Then we should set this to false so we don't need to
  // re-start budo each time. :)
  cache: true,
  // This is only needed to debug our LiveReload client
  // e.g. as above, you may want this to true if you're changing it!
  debug: false,
  // Expose LiveReload client to window.require('budo-livereload')
  expose: true,
  // Additional script(s) to include after the LiveReload client
  include: require.resolve('./live.js')
});

// run chokidar on these glob patterns
app.watch([ '**/*.{html,css,md}' ])

// get socket server
app.on('connect', ev => {
  wss = ev.webSocketServer;
});

// reload JS bundle
app.on('pending', () => app.reload());

// reload HTML/CSS + show popup
app.on('watch', function(e, file) {
  var ext = path.extname(file);
  if (/^\.md/i.test(ext)) {
    sendClientPopup({ file, time: Date.now() })
  } else if (/^\.(html?|css)/i.test(ext)) {
    // trigger a LiveReload on HTML or CSS
    app.reload(file);
  }
});

// send a message to all currently connected clients
function sendClientPopup (data) {
  if (!wss) return;
  var message = JSON.stringify(data);
  wss.clients.forEach(function (socket) {
    socket.send(message);
  });
}
