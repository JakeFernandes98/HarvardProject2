if (!localStorage.getItem(channels))
  localStorage.setItem(channels, []);

console.log("SFERA");

document.querySelector('button').onclick = () => {
  console.log("Button clicked");
  chanName = document.getElementbyId(`chanName`).value;
  let chanList = localStorage.getItem(channels);
  chanList.push(chanName);
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = "/channels/"+(chanList.length-1).toString();
  link.title = chanName;
  li.innerHTML = link;
  document.querySelector('#channelid').append(li);
  localStorage.setItem(channels, chanList);
}

let chanList = localStorage.getItem(channels);
let counter = 0;
for(ch of chanList){
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = '/channels/'+(counter).toString();
  link.title = ch;
  li.innerHTML = link;
  document.querySelector('#channelid').append(li);
  counter++;
}
