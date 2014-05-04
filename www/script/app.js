$("#get_started").click(function(){
    $.getJSON("http://disrupt.digitaltaffy.com/trips-summary?format=jsonp&callback=?",function(data){
        $(document).trigger("unity_start");
    });
});
