$(document).ready(function () {
   chrome.storage.sync.get("primary",function(obj){
    alert("Search engine form memory: "+obj.primary);
    if(obj.primary !== null){
        $("input[value="+obj.primary+"]").prop('checked',true);
    }
   });
   $("#optionsForm").submit(function(){
       //Store value of selected checkbox
       var selected = $("input[name=searchEngine]:checked").val();
      
      //Save value to storage
      chrome.storage.sync.set({
          'primary' : selected
      });
      //Notify background script that search engine has changed and that it needs to update context menu
      chrome.runtime.sendMessage({selected});
      //Display notification which search engine is set to primary
      var message = {
          type: "basic",
          title: "Primary search engine set.",
          message: "Your search engien has been set to: " + selected,
          iconUrl: "icon.png"
      }
      chrome.notifications.create('changed',message,function(){});

   });
});