//Create new menu item and register on click
var selectedEngine = "";
chrome.storage.sync.get('primary',function(items){
    selectedEngine = items.primary;
});

var menuItem = {
    "id" : "searchContext",
    "title" : "Search with " + selectedEngine.toString(),
    //Appear only when text is selected
    "contexts" : ['selection']
}
//Create context item
chrome.contextMenus.create(menuItem);
//Functionality of context item:
chrome.contextMenus.onClicked.addListener(function(clickData){
    //Was our search item clicked in context menu and is any text selected?
    if(clickData.menuItemId == "searchContext" && clickData.selectionText){
        //Compose url depending on search engine and query string
        var searchUrl = selectedEngine + ".com/" + clickData.selectionText;
        alert(searchUrl);
    }
});
