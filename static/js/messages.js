document.addEventListener('DOMContentLoaded', () => {
  var input = document.getElementById("message");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13){
      document.getElementById("send").click();
    }
  });

  var socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port);
  socket.on('connect', () => {
    document.querySelector('#send').onclick = function() {
      const message = input.value;
      input.value = "";
      socket.emit('submit message', {'message':message,'username':null});
    }
  });

  socket.on('send message', data => {
    const li = document.createElement('li');
    li.innerHTML = `${data.username}: ${data.message}`;
    document.querySelector('#messages').append(li);
  });
});
