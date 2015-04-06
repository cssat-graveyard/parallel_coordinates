 //start
   var dataset = counties; // data resource
   var color_set = color2; // color of the lines and legends
   var county_group = county_group; // group of county
   var Fstr = Fstr; // fist line of text on axis 
   var Sstr = Sstr; // second line of text on axis
   var fullname = fullname; // use for classes
   var fullname_class = fullname_class; // class of each column
   var fullname_head = fullname_head; //  text of each header in grid 
   var fullname_title = fullname_title; // title(show_box) of each header in grid
 //end
 
    var update_data = dataset;
    var colors = new Array();
    var filter;
    var grid;
    var line_highlighted = null;
    var checkbox_highlighted = null;
    var group_buttion_point = 0;
    var even = "#eee", 
        odd = "white",
        mouse_over = "#ddd",
        mouse_over_checked = "#ccc"
        checked = "#D0DCEB";
 
        for (var i=0,len=county_group.length;i<len;i++)
        {
             var g = county_group[i]["groupName"];
             colors[g]= color_set[i];
        }
        
    var m = [10, 110, 60, 110, 40], //[top,left,right,bottom,legend-hight]
        w = 1130 - m[1] - m[3],
        h = 500 - m[0] - m[2] - m[4]; //axis rang [0, h] 
    
    var x = d3.scale.ordinal().domain(fullname).rangePoints([0, w]),
        y = {};
    
    var line = d3.svg.line().interpolate('cardinal').tension(0.85),
        axis = d3.svg.axis().orient("left"),
        legend,
        foreground;  
              
    var svg = d3.select("#charts").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2] + m[4])
      .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
        
    var g_legend = svg.append("svg:g")
        .attr("class","g_legend")
        .attr("transform", "translate(-89,0)");
                
    var g_parallel = svg.append("svg:g")
        .attr("class","g_parallel")
        .attr("transform", "translate(-10,"+85+")");
    
    // Add a legend.        
      legend = g_legend.selectAll("g.legend")
          .data(county_group)
        .enter().append("svg:g")
          .attr("name","unchecked")
          .attr("class","gourp_button")
          .attr("id",function(d){
             return "gourp_button_"+d.groupCode;
          })
          .attr("transform", function(d, i) { return "translate(" + (i * 120) + ",0)"; })
          .on("mouseover",function(){
                if(d3.select(this).attr("name")=="unchecked"){
                    d3.select(this).select("rect").style("stroke-width",3);
                    }
          })
          .on("mouseout",function(){
                if(d3.select(this).attr("name")=="unchecked"){
                    d3.select(this).select("rect").style("stroke-width",.7);
                    }
          })
          .on("click",function(d){
            if(d3.select(this).attr("name")=="unchecked"){
                d3.select(this).select("rect").style("stroke-width",3);
                d3.select(this).attr("name","checked");              
                d3.selectAll("." + d.groupCode).attr("stroke-opacity",1).attr("name",function(){
                    if(d3.select(this).attr("name")=="unchecked"){  
                        return "checked";                     
                    }else{
                        return "unchecked";    
                    }
                });
                if(d3.select(this).attr("id") == "gourp_button_washington"){
                    d3.select(".grid_washington").attr("name","checked").style("background",checked);                         
                }   
            }else{
                d3.select(this).select("rect").style("stroke-width",.7);
                d3.select(this).attr("name","unchecked");
                d3.selectAll("." + d.groupCode).attr("name","unchecked").attr("stroke-opacity",0.01);
                if(d3.select(this).attr("id") == "gourp_button_washington"){
                    if(d3.select(".grid_washington").attr("class") == "list even grid_washington"){
                        d3.select(".grid_washington").attr("name","checked").style("background",even);   
                    }else{
                        d3.select(".grid_washington").attr("name","checked").style("background",odd);   
                    }                        
                } 
            }
          });
    
      legend.append("svg:rect")
          .attr("width",115)
          .attr("height",16)
          .attr("style", function(d, i) {
                return "stroke:" + colors[county_group[i]["groupName"]] + "; fill:none;";
              });
    
      legend.append("svg:text")
          .attr("x", 15)
          .attr("y",4)
          .attr("dy", ".7em")
          .text(function(d) { return d.groupName; })
          ;

     // Add reset button     
        d3.select(".g_legend").append("svg:rect")
          .attr("transform", "translate(840,0)")
          .attr("width",115)
          .attr("height",16)
          .style("fill","#FF8585")
          .style("stroke","#FF8585")
          .on("mouseover",function(){
                d3.select(this).style("stroke-width","3");
          })
          .on("mouseout",function(){
                d3.select(this).style("stroke-width","0.01");
          })
          .on("click",resetAll);
          //.style("fill","#FFD1D1");
          
       d3.select(".g_legend").append("svg:text")
            .attr("class","reset")
            //.style("fill","#3b6e8f")
            .style("fill","white")
            .attr("transform", "translate(885,12)")
            .text("Reset")
            .on("click",resetAll);   
 
    countyParallel(dataset); 
    countyList(dataset);  
    default_setting();    
 
    // Returns the path for a given data point.
    function path(d) {
      return line(fullname.map(function(p) { return [x(p), y[p](d[p])]; }));
    }


    
    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
      var actives = fullname.filter(function(p) { return !y[p].brush.empty(); }),
          extents = actives.map(function(p) { return y[p].brush.extent(); });
 
       // To be factored
        var filter = {};
        _(actives).each(function(key, i) {
          filter[key] = {
            min: extents[i][0],
            max: extents[i][1]
          }
        });
       
        foreground.classed("fade", function(d) {          //ps: classed(name,filter), add class to the data set
          return !actives.every(function(p, i) {
            return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    });
  });
  
     update_data = dataset.filter(function(d) {          
          return actives.every(function(p, i) {
            return (extents[i][0]) <= d[p] && d[p] <=(extents[i][1]);
    });
  });
   line_checkbox_highlight(update_data);
   countyList(update_data);
   reset();
}   
    // highlighted lines for multiple-choosing rows
    function line_checkbox_highlight(data){
        d3.select(".c_highlight").remove();
      highlight = g_parallel.append("svg:g")
          .attr("class", "c_highlight")
        .selectAll("path")
          .data(data)
        .enter().append("svg:path")
          .attr("d", path)
          .attr("stroke-opacity",0.01)
          .attr("name","unchecked")
          //.attr("display","none") 
          //.attr("class", "l_checkbox")
          .attr("class",function(d){
             for (var i=0,len=county_group.length;i<len;i++){
                 if(county_group[i]["groupName"]==d.region){
                    return "l_checkbox " + county_group[i]["groupCode"];
                 }
            }    
          })
          .attr("id",function(d, i){return "l_checkbox_"+i;})
          .attr("style", function(d) {
                return "stroke:" + colors[d.region] + ";";
              })
          .on("mouseover",function(){
                d3.select(this).attr("stroke-opacity",1);
          })
          .on("mouseout",function(){
                if(d3.select(this).attr("name")=="unchecked"){
                    d3.select(this).attr("stroke-opacity",0.01);
                }
          })
          .on("click",function(){
                if(d3.select(this).attr("name")=="unchecked"){
                    if(d3.select(this).attr("class")=="l_checkbox washington"){
                        d3.select("#gourp_button_washington").attr("name","checked").select("rect").style("stroke-width",3);
                    }
                    d3.select(this).attr("name","checked").attr("stroke-opacity",1);
                    if(d3.select(this).attr("class") == "l_checkbox washington"){
                        d3.select(".grid_washington").attr("name","checked").style("background",checked);                         
                    }
                }else{
                    if(d3.select(this).attr("class")=="l_checkbox washington"){
                        d3.select("#gourp_button_washington").attr("name","unchecked").select("rect").style("stroke-width",1);
                    }
                    d3.select(this).attr("name","unchecked").attr("stroke-opacity",0.01);   
                    if(d3.select(this).attr("class") == "l_checkbox washington"){
                        if(d3.select(".grid_washington").attr("class") == "list even grid_washington"){
                            d3.select(".grid_washington").attr("name","checked").style("background",even);   
                        }else{
                            d3.select(".grid_washington").attr("name","checked").style("background",odd);   
                    }                         
                    } 
                    }
          });
    }  
      
    // add highlighted line when mouse over a row
     function line_highlight(data){
         d3.selectAll(".highlight").remove();
         var line_highlighted = g_parallel.append("svg:g")
          .attr("class", "highlight")
        .selectAll(".h_path")
          .data(data)
        .enter().append("svg:path")
          .attr("class","h_path")
          .attr("d", path)
          .attr("style", function(d) {
                return "stroke:" + colors[d.region] + ";";
              });
        
     }
     
      // default : highlight 'Washington'
     function default_setting(){
        d3.select(".washington").attr("name","checked").attr("stroke-opacity",1);
        d3.select("#gourp_button_washington").attr("name","checked").select("rect").style("stroke-width",3);
        d3.select(".grid_washington").attr("name","checked").style("background",checked);
     }
     
    // reset all the choosing rows and highlighted lines
     function reset(){
       d3.selectAll(".list").attr("name","unchecked");
       d3.selectAll(".l_checkbox").attr("name","unchecked").attr("stroke-opacity",0.01);
       d3.selectAll(".even").style("background",even);
       d3.selectAll(".odd").style("background",odd);
       default_setting(); 
     }
     
     function resetAll(){
        group_buttion_point = 0;
        update_data = dataset;  
        d3.select(".g_parallel").selectAll("g").remove();
        d3.selectAll(".gourp_button").select("rect").style("stroke-width",.7); 
        countyParallel(dataset);
        countyList(dataset);   
        reset();
     }