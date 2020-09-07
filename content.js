function filterReplyBy(mes) {
  document.querySelectorAll("#content-text").forEach((i) => {
    if (i.textContent != mes) i.textContent = mes;
  });
  console.log("filterReplyBy done");
}
function filterReplyByHi() {
  document.querySelectorAll("#content-text").forEach((i) => {
    if (i.textContent != "Hi") i.textContent = "Hi";
  });
  console.log("Hi done");
}
function filterReplyByBye() {
  document.querySelectorAll("#content-text").forEach((i) => {
    if (i.textContent != "Bye") i.textContent = "Bye";
  });
  console.log("Bye done");
}
function forTest() {
  console.log(window.screenY);
}
function addLiveFilter() {
  window.addEventListener('scroll', filterReplyByHi);
  window.addEventListener('click', filterReplyByBye);
}

function removeLiveFilter() {
  window.removeEventListener('scroll', filterReplyByHi);
  window.removeEventListener('click', filterReplyByBye);
}


//interact with browser
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message recieved: ", message);
  if (message.command === 'Filter Comments') {
    // filtering code
    document.querySelectorAll("#content-text").forEach((i) => {
      i.textContent = '===== ' + message.command + ' =====';
    });
    console.log("filterReplyBy done");
    sendResponse({ success: true, result: "filtered" });
  }
  else if (message.command === 'Start Live Filter') { // 스크롤이나 클릭이 있을 때 실행
    addLiveFilter();
    sendResponse({ success: true, result: "filtering" });
  }
  else if (message.command === 'Stop Live Filter') {
    removeLiveFilter();
    sendResponse({ success: true, result: "finished" });
  }
  else {
    sendResponse({ success: false });
  }
});










// // for live

// // Callback function to execute when mutations are observed
// const callback = function (mutationsList, observer) {
//   mutationsList.forEach((i) => {
//     i.textContent = mes;
//   });
//   console.log("Filtered");
// };
// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);











