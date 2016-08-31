$(document).ready(function(){
    $("#sortable").sortable();
    $("#sortable").disableSelection();

    $("#submitSearchEngine").click(function(){
        //Store id of first list element when submit button is clicked
        var selectedSearchEngine = $("li:first").attr('id');
        //Display notifications which search engine is primary 
        var message = {
            type: "basic",
            title : "Primary search engine set.",
            //Autocapitalize first letter of the selected search engine
            message: "You search engine has been set to "+selectedSearchEngine.substr(0,1).toUpperCase()+selectedSearchEngine.substr(1),
            iconUrl: "icon.png"
        }
        chrome.notifications.create('changed',message,function(){});
    })
    
});