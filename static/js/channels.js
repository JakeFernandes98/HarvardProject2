document.addEventListener('DOMContentLoaded', () => {
  if (!list)
    var list = ["Default","Test"]

  document.querySelector('#addchan').onclick = function() {
    console.log("Button clicked");
    input = document.getElementById('chanName')
    chanName = input.value;
    list.push(chanName);
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = "/channels/"+(list.length-1).toString();
    link.innerHTML = chanName;
    li.appendChild(link);
    document.querySelector('#channellist').appendChild(li);
    input.value = "";
  }

  let counter = 0;
  for(ch of list){
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '/channels/'+(counter).toString();
    link.innerHTML = ch;
    li.appendChild(link);
    document.querySelector('#channellist').appendChild(li);
    counter++;
  }
});
