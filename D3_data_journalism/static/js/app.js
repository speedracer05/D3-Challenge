  // https://www.d3-graph-gallery.com/graph/bubble_tooltip.html

  // set the dimensions and margins of the graph
  // source: http://www.d3noob.org/2012/12/setting-up-margins-and-graph-area.html
var margin = {top: 80, right: 20, bottom: 80, left: 50},
    width = 400 - margin.left - margin.right,
    healthcare = 270 - margin.top – margin.bottom;

  // append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("healthcare", healthcare + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
d3.csv("./D3_data_journalism/static/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);

  // Add circle for each item in the array
  var circles = d3.select("#scatter").selectAll("circle")
  .data(data);

circles.enter().append("circle")
  .attr("cx", function(d, i){ return 25 + (50 * i); })
  .attr("cy", function(d, i){ return 25 + (50 * i); })
  .attr("r", 5)
  .attr("fill", "grey");

  // Add X axis
var x = d3.scaleLinear()
  .domain([d3.min(data, function(d){ return d.poverty; }) / 1.05, 
    d3.max(data, function(d){ return d.poverty; }) * 1.05])
.range([0, 800]);
svg.append("g")
  .attr("transform", "translate(0," + healthcare + ")")
  .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([d3.min(data, function(d){ return d.healthcare; }) / 1.05,
      d3.max(data, function(d){ return d.healthcare; }) * 1.05])
  .range([500, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.healthcare); } )
      .attr("cy", function (d) { return y(d.poverty); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")
})