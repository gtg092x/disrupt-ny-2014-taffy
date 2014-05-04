$("#credits").hide();
$("#unityPlayer").hide();
var acted=false;
$("#get_started").click(function(){
    if(acted)
    return;
    acted=true;

    $("<p>Searching for concur data...</p>").appendTo("#status").hide().fadeIn("SLOW",function(){
        setTimeout(function(){


        $("<p>Aggregating esri geo spatial data...</p>").appendTo("#status").hide().fadeIn("SLOW",function(){

        });
        },2000);
    });
    $.getJSON("http://disrupt.digitaltaffy.com/trips-summary?format=jsonp&callback=?",function(data){
        var c=0;
        data = data.data;
        for(var i =0;i<data.length;i++)
            for(var j=0;j<data[i].length;j++)
                c+=data[i][j].Air?data[i][j].Air.length:0;

        $("<p>Found "+c+" travel legs.</p>").appendTo("#status").hide().fadeIn("SLOW",function(){

        });
    });
        setTimeout(function(){

            $("#status").fadeOut(function(){
                $("#unityPlayer").fadeIn();
                $(document).trigger("unity_start");
                $("#credits").fadeIn("SLOW");
            });
        },6000);


});
