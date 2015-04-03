   // create header of grid
  var header = d3.select("#grid_header").append("div")
        .attr("class","header");
     
  for(var t=0,len=fullname_class.length;t<len;t++){
          header.append("div")
          .attr("class", fullname_class[(t)])
          .attr("title",fullname_title[(t)])
          .attr("id","h_"+fullname_class[(t)])
          .attr("name","unsorted")
          .text(fullname_head[(t)])
          .on("click",function(){ //sorting function
            var name = d3.select(this).attr("name");
            var column = d3.select(this).attr("class");
            if(name=="unsorted"){
                d3.select(this).attr("name","as_sorted");   //sortFunction_ascending
                 update_data.sort(function(a,b){
                return a[column] < b[column]?-1 : a[column] > b[column]? 1 : 0;
            })
            }else if(name=="as_sorted"){                   //sortFunction_ascending
               d3.select(this).attr("name","de_sorted");
                update_data.sort(function(a,b){
                    return a[column] > b[column]?-1 : a[column] < b[column]? 1 : 0;
                })
            }else{
                d3.select(this).attr("name","as_sorted");  //sortFunction_descending
                 update_data.sort(function(a,b){
                    return a[column] < b[column]?-1 : a[column] > b[column]? 1 : 0;
                })
            }
            line_checkbox_highlight(update_data); 
            countyList(update_data);
            default_setting();
          }
          );
  //  } 
  }   
 
  function countyList(data){
   
  document.getElementById("lists").innerHTML=""
   
  var grid = d3.select("#lists").append("div")
        .attr("class","grid");
  
  // content of the grid
  var county = grid.selectAll(".county")
            .data(data)
            .enter().append("div")
            .attr("class",function(d,i){
                for (var j=0,len=county_group.length;j<len;j++){
                     if(county_group[j]["groupName"]==d.region){
                        if(i%2){
                            return "list even grid_" + county_group[j]["groupCode"];
                            }else{
                            return "list odd grid_" + county_group[j]["groupCode"];  
                            }
                     }
                }})
            .attr("id",function(d,i){return "checkbox_"+i;})
            .attr("name","unchecked")
            .on("mouseover",function(d,i){ 
                var aaa = data.filter(function(p, i) { return p==d ; });
                line_highlight(aaa);
                if(d3.select(this).attr("name") == "unchecked"){
                    d3.select(this).style("background",mouse_over);
                }else{
                    d3.select(this).style("background",mouse_over_checked);
                }
                })
            .on("mouseout",function(d,i){ 
                if(d3.select(this).attr("name") == "unchecked"){
                    if(i%2==1){
                        d3.select(this).style("background",even);
                    }else{
                        d3.select(this).style("background",odd);
                    }
                }else{
                    d3.select(this).style("background",checked);
                }
                d3.selectAll(".h_path").remove();
            })
              .on("click",function(d,i){
                if(d3.select(this).attr("name") == "unchecked"){
                        if(d3.select("#l_checkbox_"+i).attr("name")=="unchecked"){
                            d3.select("#l_checkbox_"+i).attr("name","checked").attr("stroke-opacity",1);
                            if(d3.select("#l_checkbox_"+i).attr("class")=="l_checkbox washington"){
                                d3.select("#gourp_button_washington").attr("name","checked").select("rect").style("stroke-width",3);
                            }
                        }
                       d3.select(this).attr("name","checked").style("background",checked);
                    }else{
                        if(d3.select("#l_checkbox_"+i).attr("name")=="checked"){
                            d3.select("#l_checkbox_"+i).attr("name","unchecked").attr("stroke-opacity",0.01);
                            if(d3.select("#l_checkbox_"+i).attr("class")=="l_checkbox washington"){
                                d3.select("#gourp_button_washington").attr("name","unchecked").select("rect").style("stroke-width",1);
                            }
                        }
                        if(i%2==1){
                        d3.select(this).style("background",even);
                        }else{
                            d3.select(this).style("background",odd);
                        }
                        d3.select(this).attr("name","unchecked");  
                    }
         });
  
  var formatPercent = d3.format("%");
  var formatNum = d3.format("0,000");
     
  county.append("div")
        .attr("class",fullname_class[0])
        .append("text")
        .text(function(d){return d.county});
        
  county.append("div")
        .attr("class", fullname_class[1])
        .append("text")
        .text(function(d){return d.region});
        
  county.append("div")
        .attr("class",function(d,i){return fullname_class[2];})
        .append("text")
        .text(function(d){return formatNum(d.child_population)});
        
  county.append("div")
        .attr("class",function(d,i){return fullname_class[3];})
        .append("text")
        .text(function(d){return formatPercent(d.poverty_percent)});
        
  county.append("div")
        .attr("class",function(d,i){return fullname_class[4];})
        .append("text")
        .text(function(d){return d.entries});
        
   county.append("div")
        .attr("class",function(d,i){return fullname_class[5];})
        .append("text")
        .text(function(d){return formatPercent(d.age_entries)});
        
   county.append("div")
        .attr("class",function(d,i){return fullname_class[6];})
        .append("text")
        .text(function(d){return formatPercent(d.dependency_entries)});
        
   county.append("div")
        .attr("class",function(d,i){return fullname_class[7];})
        .append("text")
        .text(function(d){return formatPercent(d.reunification)});
        
   county.append("div")
        .attr("class",function(d,i){return fullname_class[8];})
        .append("text")
        .text(function(d){return formatNum(d.length_of_stay)});
        
        
  }
  
  