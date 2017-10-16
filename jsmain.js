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
    venni.append("circle").attr("cx",140).attr("cy",115).attr("r",0)
        .attr("fill","#44B39D").attr("opacity",0.7).attr("class","cir1").attr("stroke-width",2);
    venni.append("circle").attr("cx",240).attr("cy",115).attr("r",0)
        .attr("fill","#f39c12").attr("opacity",0.7).attr("class","cir2").attr("stroke-width",2);
    venni.append("circle").attr("cx",170).attr("cy",225).attr("r",0)
        .attr("fill","#EB6B56").attr("opacity",0.7).attr("class","cir3").attr("stroke-width",2);
    venni.append("text").attr("x",240).attr("y",305).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Arnab");
    venni.append("text").attr("x",60).attr("y",150).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Anti-Arnab");
    venni.append("text").attr("x",290).attr("y",75).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Pro-Arnab");
    venni.append("text")
        .attr("x",190).attr("y",255).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab']);
    venni.append("text")
        .attr("x",290).attr("y",125).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['pro']);
    venni.append("text")
            .attr("x",100).attr("y",90).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['anti']);
    venni.append("text")
            .attr("x",230).attr("y",185).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab-pro']);
    venni.append("text")
            .attr("x",145).attr("y",195).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['arnab-anti']);
    venni.append("text")
            .attr("x",195).attr("y",100).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['pro-anti']);
    venni.append("text")
            .attr("x",190).attr("y",160).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[0]['all']);



    var venni2 = d3.select("#venn2").append("svg").attr("width", 350).attr("height", 350);
    //venni.append("rect").attr("x",0).attr("y",0).attr("width",400).attr("height",350).attr("fill","#333333");
    venni2.append("circle").attr("cx",120).attr("cy",165).attr("r",0)
        .attr("fill","#44B39D").attr("opacity",0.7).attr("class","cir4").attr("stroke-width",2);
    venni2.append("circle").attr("cx",200).attr("cy",165).attr("r",0)
        .attr("fill","#EB6B56").attr("opacity",0.7).attr("class","cir5").attr("stroke-width",2);
    venni2.append("text").attr("x",60).attr("y",200).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Anti-Arnab");
    venni2.append("text").attr("x",270).attr("y",125).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text("Arnab & Team");
    venni2.append("text")
        .attr("x",250).attr("y",175).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['for']);
    venni2.append("text")
            .attr("x",60).attr("y",140).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['against']);
    venni2.append("text")
            .attr("x",155).attr("y",150).attr("text-anchor","middle").attr("opacity",0).attr("class","txt1").text(overlap[1]['both']);
    

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






   
});

