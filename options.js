$(document).ready(function(){
    $("#sortable").sortable();
    $("#sortable").disableSelection();

    $("#submitSearchEngine").click(function(){
        var selectedSearchEngine = $("li:first").attr('id');
        alert(selectedSearchEngine);
    })
    
});