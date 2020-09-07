chrome.runtime.onInstalled.addListener(function () {
  // storage에 data 저장
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green!.");
  });

  //  conditions에 맞는 페이지일 경우 page_action 활성화
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'youtube.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  // context menu 추가
  chrome.contextMenus.create({
    "id": "Filter Comments",
    "title": "Filter Comments",
    // "contexts": ["page"] // 어떤 요소 위에서 context menu를 불렀을 때 나타날 것인가

  }, function () {
    if (chrome.extension.lastError) {
      console.log("Got error at <Filter Comments>: " + chrome.extension.lastError.message);
    }
    else console.log("Created Context Menu <Filter Comments>!.");
  });
  // Start Live Filter
  chrome.contextMenus.create({
    "id": "Start Live Filter",
    "title": "Start Live Filter",
  }, function () {
    if (chrome.extension.lastError) {
      console.log("Got error at <Start Live Filter>: " + chrome.extension.lastError.message);
    }
    else console.log("Created Context Menu <Start Live Filter>!.");
  });
  // Stop Live Filter
  chrome.contextMenus.create({
    "id": "Stop Live Filter",
    "title": "Stop Live Filter",
  }, function () {
    if (chrome.extension.lastError) {
      console.log("Got error at <Stop Live Filter>: " + chrome.extension.lastError.message);
    }
    else console.log("Created Context Menu <Stop Live Filter>!.");
  });


});

// add onClickHander for contextMenus
function onClickHandler(info, tab) {
  console.log("item <" + info.menuItemId + "> was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
  const command = info.menuItemId;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tab.id, { command }, function (response) {
      if (chrome.extension.lastError) {
        console.log("Got error at <Sending Message>: " + chrome.extension.lastError.message);
      }
      else {
        if (response.success) console.log("res:", response.result);
        else console.log("Command " + command + " failed!");
      }
    });
  });
};
chrome.contextMenus.onClicked.addListener(onClickHandler);

