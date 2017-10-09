
$(document).ready(function(){
    var svg = d3.select("#svgdiv").append("svg").attr("width", 1000).attr("height", 200);
    d3.json("arnab.json", function(error, roh) {
        //console.log(roh,roh[roh.length-1]["end"]);
        timeinsecs = parseInt(roh[roh.length-1]["end"]);
        var  x = d3.scaleLinear().range([100, 900]).domain([0,timeinsecs]);
        svg.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
        svg.selectAll(".rectcol").data(roh).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#EB6B56")

        d3.json("propop.json", function(error, roh2) {
        var svg2 = d3.select("#svgdiv2").append("svg").attr("width", 1000).attr("height", 200);
        svg2.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
        svg2.selectAll(".rectcol2").data(roh2.for).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#f39c12")
        
        var svg3 = d3.select("#svgdiv3").append("svg").attr("width", 1000).attr("height", 200);
        svg3.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
        svg3.selectAll(".rectcol2").data(roh2.against).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#44B39D")


        var svg4 = d3.select("#svgdiv4").append("svg").attr("width", 1000).attr("height", 200);
        svg4.append("rect").attr("x",x(0)).attr("width",x(timeinsecs)-x(0)).attr("y",50).attr("height",100).attr("fill","#eeeeee");
        svg4.selectAll(".rectcol2").data(roh2.against).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#44B39D").attr("opacity",0.4)

        svg4.selectAll(".rectcol2").data(roh2.for).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#f39c12").attr("opacity",0.4)

        svg4.selectAll(".rectcol2").data(roh).enter().append("rect")
            .attr("x",function(d,i){
                console.log("x",x(parseInt(d.start)));
                return x(parseInt(d.start));
            }).attr("width",function(d,i){
                console.log("width",x(parseInt(d.end-d.start)))
                return x(parseInt(d.end-d.start))-100;
            }).attr("y",50).attr("height",100).attr("fill","#EB6B56").attr("opacity",0.4)



        });
    });
});

