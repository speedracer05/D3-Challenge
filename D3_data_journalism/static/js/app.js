// @TODO: YOUR CODE HERE!
// https://www.d3-graph-gallery.com/graph/bubble_tooltip.html

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

    // append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
d3.csv("/D3_data_journalism/static/data/data.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
  .domain([0, 10000])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
})