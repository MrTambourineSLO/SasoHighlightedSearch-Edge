$(document).ready(function () {
    
    chrome.storage.sync.get("primary",function(items){
    
    //TODO: Set default checked radio button to google if there's no value in storage for 'primary'...
    if(items.primary == null){
        
        $("input[value='google']").prop('checked',true);
        
    }

    
    //If previous selection is still in chrome storage, check the appropriate radio button
    if(items.primary !== null){
        $("input[value="+items.primary+"]").prop('checked',true);
    }
   });
   //When submit button is pressed
   $("#optionsForm").submit(function(){
       //Store value of selected checkbox
       var selected = $("input[name=searchEngine]:checked").val();
     
      //Save value to storage
      
      chrome.storage.sync.set({
          'primary' : selected
      });
      //Notify background script that search engine has changed and that it needs to update context menu
      chrome.runtime.sendMessage({primary:selected});
      //Create & display notification which search engine is set to primary
      var message = {
          type: "basic",
          title: "Primary search engine set.",
          message: "Your search engien has been set to: " + selected,
          iconUrl: "icon.png"
      }
      chrome.notifications.create('changed',message,function(){});

   });
});