import "./index.scss";

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  const privateKey= document.getElementById("privateKey").value;

  const body = JSON.stringify({
    sender, amount, recipient, privateKey
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  //}).then(({ balance , message }) => {
    //document.getElementById("balance").innerHTML = balance;
}).then(({ message }) => {
    document.getElementById("message").innerHTML = message;
  });
});


document.getElementById("mempool-txs").addEventListener('click', () => {  
  fetch(`${server}/mempoolHeight`).then((response) => {
    return response.json();
  }).then(({ memcount }) => {
    document.getElementById("memcount").innerHTML = memcount;
  });
});


document.getElementById("start-mining").addEventListener('click', () => {
fetch(`${server}/startMining`).then((response) => {
    return response.json();
  }).then(({ message }) => {
    document.getElementById("mining-message").innerHTML = message;
    document.getElementById("stopmining-message").innerHTML = "";
  });
});

document.getElementById("stop-mining").addEventListener('click', () => {
fetch(`${server}/stopmining`).then((response) => {
    return response.json();
  }).then(({ message }) => {
    document.getElementById("stopmining-message").innerHTML = message;
    document.getElementById("mining-message").innerHTML = "";
  });
});





