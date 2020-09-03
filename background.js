chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green!.");
  });

  //  conditions에 맞는 페이지일 경우 page_action 활성화
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});