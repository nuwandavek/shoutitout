
$(document).ready(function(){
    d3.json("final_arp.json", function(error, roh2) {
    timeinsecs = roh2.duration;
    var  x = d3.scaleLinear().range([100, 900]).domain([0,timeinsecs]);
   

    var svg = d3.select("#svgdiv").append("svg").attr("width", 1000).attr("height", 200);
    svg.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
    svg.selectAll(".rectcol2").data(roh2.arnab).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",50).attr("height",100).attr("fill","#EB6B56")
    
    

    var svg2 = d3.select("#svgdiv2").append("svg").attr("width", 1000).attr("height", 200);
    svg2.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
    svg2.selectAll(".rectcol2").data(roh2.for).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",50).attr("height",100).attr("fill","#f39c12")
    
    var svg3 = d3.select("#svgdiv3").append("svg").attr("width", 1000).attr("height", 200);
    svg3.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
    svg3.selectAll(".rectcol2").data(roh2.against).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#44B39D")


    var svg4 = d3.select("#svgdiv4").append("svg").attr("width", 1000).attr("height", 87);
    svg4.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
    svg4.selectAll(".rectcol2").data(roh2.against).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",80).attr("height",7).attr("fill","#44B39D")

    svg4.selectAll(".rectcol2").data(roh2.for).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",70).attr("height",7).attr("fill","#f39c12")

    svg4.selectAll(".rectcol2").data(roh2.arnab).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",60).attr("height",7).attr("fill","#EB6B56")

        svg4.selectAll(".rectcol2").data(roh2.intro).enter().append("rect")
        .attr("x",function(d,i){
            //console.log("x",x(parseInt(d.start)));
            return x(parseInt(d.start));
        }).attr("width",function(d,i){
            //console.log("width",x(parseInt(d.end-d.start)))
            return x(parseInt(d.end-d.start))-100;
        }).attr("y",50).attr("height",7).attr("fill","#3498db")
    });

});

