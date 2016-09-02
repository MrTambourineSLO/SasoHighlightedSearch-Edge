//Create new menu item and register on click
var menuItem = {
    "id": "searchContext",
    "title": "search with ",
    //Appear only when text is selected
    "contexts": ['selection']
}

document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get('primary', function (items) {
        alert(items.primary);
        menuItem['title'] += items.primary;
        alert(menuItem.title);
        /*Event Listener for options change*/
        //Create context item
        chrome.contextMenus.create(menuItem);
        /*END OF Event Listener for options change*/
    });
}, true);
//If there was change of primary search engine in options, update contextMenu according to
//message recieved from options page.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.id+" recieved in event script");
    chrome.contextMenus.update(menuItem.id,{title:'Search with '+message.id});
});
chrome.contextMenus.onClicked.addListener(function (clickData) {
    //Was our search item clicked in context menu and is there any text selected?
    if (clickData.menuItemId == "searchContext" && clickData.selectionText) {
        //Compose url depending on search engine and query string
        var searchUrl;
        chrome.storage.sync.get('primary', function (items) {
            if (items.primary) {
                searchUrl = items.primary + ".com/" + clickData.selectionText;
                alert(searchUrl);
            }

        });

    }
});  
