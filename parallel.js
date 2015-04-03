function countyParallel(data){
    
  // Create a scale and brush for each trait.
  fullname.forEach(function(d) {
  
  // Coerce values to numbers.
  data.forEach(function(p) { p[d] = +p[d]; });

        if( d == "child_population"){
            y[d] = d3.scale.log()
               //.domain(d3.extent(data, function(p) { return p[d]; }))
               .domain([d3.min(data, function(p) { return p[d]; }),2010000])
               .range([h, 0]);
          }
            else{ 
            y[d] = d3.scale.linear()
              .domain(d3.extent(data, function(p) { return p[d]; }))
              .range([h, 0]);}
 
        y[d].brush = d3.svg.brush()
            .y(y[d])
            .on("brush", brush);
  });
      
  //Add foreground lines.
  foreground = g_parallel.append("svg:g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(data)
    .enter().append("svg:path")
      .attr("d", path)
      .attr("style", function(d) {
            return "stroke:" + colors[d.region] + ";";
          });
  
  // Add highlighted lines.
  line_checkbox_highlight(data);
  
  // Add a group element for each statistic.
  var g = g_parallel.selectAll(".statistic")
      .data(fullname)
    .enter().append("svg:g")
      .attr("class", "statistic")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
      .origin(function(d) { return {x: x(d)}; })
      .on("dragstart", dragstart)
      .on("drag", drag)
      .on("dragend", dragend));

  // Add an axis and title.
  g.append("svg:g")
      .attr("class", "axis")
      .each(
       function(d) { 
           if(d == "child_population"){
                formatPercent = null; 
                d3.select(this).call(axis.scale(y[d]).tickFormat(formatPercent)); 
                }
           else if(d == "entries" || d == "length_of_stay"){ 
                formatPercent = null; 
                d3.select(this).call(axis.scale(y[d]).tickFormat(formatPercent)); 
                }
           else{
                formatPercent = d3.format(".0%"); 
                d3.select(this).call(axis.scale(y[d]).tickFormat(formatPercent)); 
                }
            }
      ) 
    .append("svg:text")
      .data(Fstr)
      .attr("text-anchor", "middle")
      .attr("y", -20)
      .text(String);
      
      g.append("svg:text")
          .data(Sstr)
          .attr("text-anchor", "middle")
          .attr("y", -9)
          .text(String);  

  // Add a brush for each axis.
  g.append("svg:g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(y[d].brush); })
    .selectAll("rect")
      .attr("x", -10)
      .attr("width", 20);

  var dragging = {};
    
  function dragstart(d) {
    i = fullname.indexOf(d);
  }

  function drag(d) {
    x.range()[i] = d3.event.x;
    fullname.sort(function(a, b) { return x(a) - x(b); });
    g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
    foreground.attr("d", path);
    highlight.attr("d", path);
  }

  function dragend(d) {
    x.domain(fullname).rangePoints([0, w]);
    var t = d3.transition().duration(500);
    t.selectAll(".statistic").attr("transform", function(d) { return "translate(" + x(d) + ")"; });
    t.selectAll(".foreground path").attr("d", path);
    t.selectAll(".c_highlight path").attr("d", path);
  }
}