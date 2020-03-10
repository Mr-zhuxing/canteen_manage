var ws = new WebSocket('ws://127.0.0.1:3001')
ws.onopen = function () {
  ws.send('hello server')
};
var badge = document.querySelector('.badge')
console.log(badge)
ws.onmessage = function (event) {
  var data = JSON.parse(event.data)
  if (data instanceof Array) {
    console.log('-收到了-', data)
    if (data.length != 0) {
      badge.innerText = data.length;
    }
  }
}
setInterval(() => {
  ws.send('hello boy . are you OK?')
}, 30 * 1000);
