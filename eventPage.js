//Create new menu item and register on click
var menuItem = {
    "id": "searchContext",
    "title": "search with ",
    //Appear only when text is selected
    "contexts": ['selection']
}
//TODO: Set menu item search engine w/o waiting for event if there is already
//a 'primary' value in chrome storage.
chrome.storage.sync.get("primary",function(items){
    if(items.primary !== undefined){
        chrome.contextMenus.update(menuItem.id,{title:'Search with '+items.primary});
        alert("From 1st storage get, primary= "+items.primary);
    }
});

//Listen for changes made in options.js script
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get('primary', function (items) {
        alert("Event page recieved change to: "+items.primary);
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
    alert(message.primary   +" recieved in event script");
    chrome.contextMenus.update(menuItem.id,{title:'Search with '+message.primary});
});
// When we click on context menu:
chrome.contextMenus.onClicked.addListener(function (clickData) {
    //Was our search item clicked in context menu and is there any text selected?
    if (clickData.menuItemId == "searchContext" && clickData.selectionText) {
        //Compose url depending on search engine and query string
        var searchUrl;
        chrome.storage.sync.get('primary', function (items) {
            if (items.primary) {
                switch(items.primary.toLowerCase()){
                    case 'google':
                    searchUrl ="http://www."+ items.primary + ".com/search?q=" + clickData.selectionText;
                    break;
                    case 'bing':
                    searchUrl = "http://www."+ items.primary + ".com/search?q=" + clickData.selectionText;
                    break;
                    case 'yahoo':
                    searchUrl = "http://search."+ items.primary + ".com/search?q=" + clickData.selectionText;
                    break;
                    case 'wikipedia':
                    searchUrl = "http://en."+ items.primary + ".org/wiki/" + clickData.selectionText;
                }
                
            
            }
            //Open searchUrl constructed above in the new tab
            var resultWindow = window.open(searchUrl,'_blank');
            resultWindow.location;  

        });
            

    }
});  
