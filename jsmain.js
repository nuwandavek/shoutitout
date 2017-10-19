var timeline_svg = function(x,id,timeinsecs,color,intro,rect_data,num){
    var svg = d3.select(id).append("svg").attr("width", 900).attr("height", 120);
    svg.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",10).attr("height",100).attr("fill","#333333");
    svg.selectAll(".rectcol").data(rect_data).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            //return x(parseInt(d.start));
            return 0;
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            //return x(parseInt(d.end-d.start))-10;
            return 0;
        }).attr("y",10).attr("height",100).attr("fill",color)
        .attr("class","rect"+num);
    svg.append("line").attr("x1",x(intro)).attr("x2",x(intro)).attr("y1",10).attr("y2",110)
        .attr("stroke","#eeeeee").attr("stroke-width",3).attr("stroke-dasharray",3);
    svg.append("text").attr("x",850).attr("y",50).attr("text-anchor","middle").text(function(){
        var temp = "t" + num
        return times[temp].name;
    });
    svg.append("text").attr("x",850).attr("y",70).attr("text-anchor","middle").text(function(){
        var temp = "t" + num
        return (times[temp].time * 100 / timeinsecs).toFixed(2) + "%";
    });
    svg.append("text").attr("x",850).attr("y",90).attr("text-anchor","middle").text("of the show");
}

var smooth_timeline = function(className,time,x){
    d3.selectAll(className).transition().duration(time)
            .attr("x",function(d,i){
                return x(parseInt(d.start));
            })
            .attr("width",function(d,i){
                return x(parseInt(d.end-d.start))-10;
            });
}

var circleEnlarger = function(){
    var  k = d3.scaleLinear().range([0, 100]).domain([0,22]);
    d3.selectAll(".cir1").transition().duration(1000).attr("r",k(venn[0]));
    d3.selectAll(".cir2").transition().duration(1000).attr("r",k(venn[1]));
    d3.selectAll(".cir3").transition().duration(1000).attr("r",k(venn[2]));
    d3.selectAll(".cir4").transition().duration(1000).attr("r",k(venn2[0]));
    d3.selectAll(".cir5").transition().duration(1000).attr("r",k(venn2[1]));
    d3.selectAll(".txt1").transition().delay(1000).duration(1000).attr("opacity",1);
}

var populateHotWords = function(word,svg,scale){
    console.log(word);

    var  rad = d3.scaleLinear().range([0, 150]).domain([0,25]);
    svg.selectAll(".hotBubble1").data(hotwords.Arnab[word].times).enter().append("circle")
        .attr("cx",function(d){
            return scale(d);
        })
        .attr("cy",70).attr("r",0).attr("fill","#EB6B56").attr("opacity",0.4)
        .attr("stroke","#eeeeee").attr("stroke-width",0.1).attr("class","hotbub1");

    svg.selectAll(".hotBubble1").data(hotwords.For[word].times).enter().append("circle")
        .attr("cx",function(d){
            return scale(d);
        })
        .attr("cy",70).attr("r",0).attr("fill","#f39c12").attr("opacity",0.4)
        .attr("stroke","#eeeeee").attr("stroke-width",0.1).attr("class","hotbub2");

    svg.selectAll(".hotBubble1").data(hotwords.Against[word].times).enter().append("circle")
        .attr("cx",function(d){
            return scale(d);
        })
        .attr("cy",70).attr("r",0).attr("fill","#44B39D").attr("opacity",0.4)
        .attr("stroke","#eeeeee").attr("stroke-width",0.1).attr("class","hotbub3");
    svg.selectAll(".hotBubble1").data(hotwords.Intro[word].times).enter().append("circle")
        .attr("cx",function(d){
            return scale(d);
        })
        .attr("cy",70).attr("r",0).attr("fill","#3498db").attr("opacity",0.4)
        .attr("stroke","#eeeeee").attr("stroke-width",0.1).attr("class","hotbub4");

    svg.append("circle").attr("cx",scale(8*60)).attr("cy",270).attr("r",0).attr("fill","#EB6B56").attr("class","hotbub5");
    svg.append("circle").attr("cx",scale(24*60)).attr("cy",270).attr("r",0).attr("fill","#f39c12").attr("class","hotbub6");
    svg.append("circle").attr("cx",scale(40*60)).attr("cy",270).attr("r",0).attr("fill","#44B39D").attr("class","hotbub7");

    d3.selectAll(".hotbub1").transition().duration(1000).attr("r",20);
    d3.selectAll(".hotbub2").transition().duration(1000).attr("r",20);
    d3.selectAll(".hotbub3").transition().duration(1000).attr("r",20);
    d3.selectAll(".hotbub4").transition().duration(1000).attr("r",20);
    d3.select(".hotbub5").transition().duration(1000).attr("r",rad(hotwords.Arnab[word].counts));
    d3.select(".hotbub6").transition().duration(1000).attr("r",rad(hotwords.For[word].counts));
    d3.select(".hotbub7").transition().duration(1000).attr("r",rad(hotwords.Against[word].counts));


    svg.append("text").attr("x",scale(8*60)).attr("y",450).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee")
    .attr("class","hotbubtxt").text("Count : " + hotwords.Arnab[word].counts);

    svg.append("text").attr("x",scale(24*60)).attr("y",450).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee")
    .attr("class","hotbubtxt").text("Count : " + hotwords.For[word].counts);

    svg.append("text").attr("x",scale(40*60)).attr("y",450).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee")
    .attr("class","hotbubtxt").text("Count : " + hotwords.Against[word].counts);

    svg.append("text").attr("x",scale(24*60)).attr("y",495).attr("font-size",30).attr("text-anchor","middle").attr("fill","#eee")
    .attr("class","hotbubtxt").text("Hotword : " + word);


}


$(document).ready(function(){
    timeinsecs = interval_data.duration;
    var  x = d3.scaleLinear().range([10, 790]).domain([0,timeinsecs]);
   

    var svg00 = d3.select("#svgdiv00").append("svg").attr("width", 800).attr("height", 30);
    svg00.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",20).attr("height",10).attr("fill","#333333");
    svg00.append("line").attr("x1",x(interval_data.debate_start)).attr("x2",x(interval_data.debate_start)).attr("y1",10).attr("y2",110)
        .attr("stroke","#eeeeee").attr("stroke-width",3);
    svg00.append("text").attr("x",x(0)).attr("y",15).attr("font-size",14).text("0 min");
    svg00.append("text").attr("x",x(interval_data.debate_start)).attr("y",15).attr("font-size",14).attr("text-anchor","middle").text("Debate Begins : 8.16min");
    svg00.append("text").attr("x",x(20*60)).attr("y",15).attr("font-size",14).attr("text-anchor","middle").text("20min");
    svg00.append("text").attr("x",x(30*60)).attr("y",15).attr("font-size",14).attr("text-anchor","middle").text("30min");
    svg00.append("text").attr("x",x(40*60)).attr("y",15).attr("font-size",14).attr("text-anchor","middle").text("40min");
    svg00.append("text").attr("x",x(48*60)).attr("y",15).attr("font-size",14).attr("text-anchor","end").text("48min");


    timeline_svg(x,"#svgdiv0",timeinsecs,"#3498db",interval_data.debate_start,interval_data.intro,1);
    timeline_svg(x,"#svgdiv",timeinsecs,"#EB6B56",interval_data.debate_start,interval_data.arnab,2);
    timeline_svg(x,"#svgdiv2",timeinsecs,"#f39c12",interval_data.debate_start,interval_data.for,3);
    timeline_svg(x,"#svgdiv3",timeinsecs,"#44B39D",interval_data.debate_start,interval_data.against,4);

   
    var svg4 = d3.select("#svgdiv4").append("svg").attr("width", 800).attr("height", 67);
    svg4.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",10).attr("height",100).attr("fill","#333333");
    svg4.selectAll(".rectcol2").data(interval_data.against).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-10;
        }).attr("y",50).attr("height",7).attr("fill","#44B39D")

    svg4.selectAll(".rectcol2").data(interval_data.for).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-10;
        }).attr("y",40).attr("height",7).attr("fill","#f39c12")

    svg4.selectAll(".rectcol2").data(interval_data.arnab).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-10;
        }).attr("y",30).attr("height",7).attr("fill","#EB6B56")

    svg4.selectAll(".rectcol2").data(interval_data.intro).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-10;
        }).attr("y",20).attr("height",7).attr("fill","#3498db")

    svg4.append("line").attr("x1",x(interval_data.debate_start)).attr("x2",x(interval_data.debate_start)).attr("y1",10).attr("y2",110)
        .attr("stroke","#eeeeee").attr("stroke-width",3).attr("stroke-dasharray",3);


    var venni = d3.select("#venn").append("svg").attr("width", 350).attr("height", 350);
    //venni.append("rect").attr("x",0).attr("y",0).attr("width",400).attr("height",350).attr("fill","#333333");
    venni.append("circle").attr("cx",145).attr("cy",145).attr("r",0)
        .attr("fill","#44B39D").attr("opacity",0.7).attr("class","cir1").attr("stroke-width",2);
    venni.append("circle").attr("cx",185).attr("cy",115).attr("r",0)
        .attr("fill","#f39c12").attr("opacity",0.7).attr("class","cir2").attr("stroke-width",2);
    venni.append("circle").attr("cx",175).attr("cy",215).attr("r",0)
        .attr("fill","#EB6B56").attr("opacity",0.7).attr("class","cir3").attr("stroke-width",2);
    venni.append("text").attr("x",245).attr("y",305).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Arnab");
    venni.append("text").attr("x",50).attr("y",150).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Anti-Arnab");
    venni.append("text").attr("x",295).attr("y",75).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Pro-Arnab");
    venni.append("text")
        .attr("x",195).attr("y",265).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab']);
    venni.append("text")
        .attr("x",275).attr("y",105).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['pro']);
    venni.append("text")
            .attr("x",55).attr("y",115).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['anti']);
    venni.append("text")
            .attr("x",255).attr("y",175).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab-pro']);
    venni.append("text")
            .attr("x",130).attr("y",215).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab-anti']);
    venni.append("text")
            .attr("x",165).attr("y",100).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['pro-anti']);
    venni.append("text")
            .attr("x",175).attr("y",160).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['all']);



    var venni2 = d3.select("#venn2").append("svg").attr("width", 350).attr("height", 350);
    //venni.append("rect").attr("x",0).attr("y",0).attr("width",400).attr("height",350).attr("fill","#333333");
    venni2.append("circle").attr("cx",155).attr("cy",165).attr("r",0)
        .attr("fill","#44B39D").attr("opacity",0.7).attr("class","cir4").attr("stroke-width",2);
    venni2.append("circle").attr("cx",195).attr("cy",165).attr("r",0)
        .attr("fill","#EB6B56").attr("opacity",0.7).attr("class","cir5").attr("stroke-width",2);
    venni2.append("text").attr("x",60).attr("y",200).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Anti-Arnab");
    venni2.append("text").attr("x",280).attr("y",125).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Arnab & Team");
    venni2.append("text")
        .attr("x",290).attr("y",175).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['for']);
    venni2.append("text")
            .attr("x",60).attr("y",140).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['against']);
    venni2.append("text")
            .attr("x",165).attr("y",150).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['both']);
    

    var hot1 = d3.select("#hotwords1").append("svg").attr("width",800).attr("height",500);
    hot1.append("rect").attr("x",0).attr("y",69).attr("width",800).attr("height",2).attr("fill","#eeeeee");
    var p = d3.scaleLinear().range([0, 800]).domain([0,timeinsecs]);

    hot1.append("text").attr("x",p(0)).attr("y",40).attr("font-size",14).attr("fill","#eeeeee").text("0 min");
    hot1.append("text").attr("x",p(interval_data.debate_start)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eeeeee").text("Debate Begins : 8.16min");
    hot1.append("text").attr("x",p(20*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("20min");
    hot1.append("text").attr("x",p(30*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("30min");
    hot1.append("text").attr("x",p(40*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("40min");
    hot1.append("text").attr("x",p(48*60)).attr("y",40).attr("font-size",14).attr("text-anchor","end").attr("fill","#eee").text("48min");
    hot1.append("text").attr("x",p(8*60)).attr("y",430).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee").text("Arnab");
    hot1.append("text").attr("x",p(24*60)).attr("y",430).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee").text("Pro-Arnab");
    hot1.append("text").attr("x",p(40*60)).attr("y",430).attr("font-size",20).attr("text-anchor","middle").attr("fill","#eee").text("Anti-Arnab");

    $(".selectpicker").change(function(){
        var selectedDeps = $('.selectpicker').val();
        d3.selectAll(".hotbub1").remove();
        d3.selectAll(".hotbub2").remove();
        d3.selectAll(".hotbub3").remove();
        d3.selectAll(".hotbub4").remove();
        d3.selectAll(".hotbub5").remove();
        d3.selectAll(".hotbub6").remove();
        d3.selectAll(".hotbubtxt").remove();
        populateHotWords(selectedDeps,hot1,p); 
    })

    for(var m = 0; m<outrageous.length;m++){
        var min = (outrageous[m].time/60.0).toFixed(2);
        var div1 = $(".carousel-inner").append("<div class='item meti' id='item-"+m+"''></div>");
        $("#item-"+m).append("<div class='carousel-content cont-car col-md-8 col-md-offset-2'><p>\""+outrageous[m].comment+"\"<br> - "+outrageous[m].who+"<br>"+min+" mins</div>");   
    }
    $($(".item")[0]).addClass("active");
    $("#out-circle-0").addClass("pulse");
    
    var hot2 = d3.select("#carousel-time").append("svg").attr("width",800).attr("height",100);
    hot2.append("rect").attr("x",0).attr("y",69).attr("width",800).attr("height",2).attr("fill","#eeeeee");
    var p = d3.scaleLinear().range([0, 800]).domain([0,timeinsecs]);

    hot2.append("text").attr("x",p(0)).attr("y",40).attr("font-size",14).attr("fill","#eeeeee").text("0 min");
    hot2.append("text").attr("x",p(interval_data.debate_start)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eeeeee").text("Debate Begins : 8.16min");
    hot2.append("text").attr("x",p(20*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("20min");
    hot2.append("text").attr("x",p(30*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("30min");
    hot2.append("text").attr("x",p(40*60)).attr("y",40).attr("font-size",14).attr("text-anchor","middle").attr("fill","#eee").text("40min");
    hot2.append("text").attr("x",p(48*60)).attr("y",40).attr("font-size",14).attr("text-anchor","end").attr("fill","#eee").text("48min");

    hot2.selectAll(".out-circles").data(outrageous).enter().append("circle").attr("cx",function(d){
        return p(d.time);
    }).attr("cy",69).attr("r",10).attr("fill",function(d){
        return d.color;
    }).attr("id",function(d,i){
        return "out-circle-"+i
    }).attr("class","out-circles").style("opacity",0.75);
    
    $('#carousel-example-generic').bind('slide.bs.carousel', function (e) {
        var yo = $(e.relatedTarget).attr("id").split("-")[1];
        $(".out-circles").removeClass("pulse");
        $("#out-circle-"+yo).addClass("pulse")
    });




    

    var waypoints1 = $('#timelines-pre').waypoint({
        handler: function(direction) {
            console.log(this.element.id + ' hit')
            smooth_timeline(".rect1",1000,x);
            smooth_timeline(".rect2",1000,x);
            smooth_timeline(".rect3",1000,x);
            smooth_timeline(".rect4",1000,x);
            
        }
    }, {
        offset: '100%'
    });


    var waypoints2 = $('#svgdiv3').waypoint({
        handler: function(direction) {
            circleEnlarger();
        }
    }, {
        offset: '100%'
    });

    var waypoints3 = $('#venn2').waypoint({
        handler: function(direction) {
            populateHotWords("Pakistan",hot1,p);
            $('.selectpicker').selectpicker('val', 'Pakistan');
            this.destroy();   
        }
    }, {
        offset: '100%'
    });





   
});

