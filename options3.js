$(document).ready(function () {
    // $("#sortable").sortable();
    // $("#sortable").disableSelection();
    chrome.storage.sync.set({
        'primary': $('li:first').attr('id')
    });
   

    


    $("#submitSearchEngine").click(function () {
        //Store id of first list element when submit button is clicked
        var selectedSearchEngine = $("li:first").attr('id');
        //Save to storage
        chrome.storage.sync.set({
            'primary': selectedSearchEngine
        });
        //Notify background script that search engine has changed & that it needs to update contextMenu
        chrome.runtime.sendMessage({id:$('li:first').attr('id')});
        //Display notifications which search engine is primary 
        var message = {
            type: "basic",
            title: "Primary search engine set.",
            //Autocapitalize first letter of the selected search engine
            message: "You search engine has been set to " + selectedSearchEngine.substr(0, 1).toUpperCase() + selectedSearchEngine.substr(1),
            iconUrl: "icon.png"
        }
        chrome.notifications.create('changed', message, function () { });
    });

});