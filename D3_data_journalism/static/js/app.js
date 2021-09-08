  // Set dimensions and margins of svg chart area
  // ********************************************
var margin = {top: 80, right: 20, bottom: 80, left: 50},
  width = 720 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  // Append the svg object to the body of the page and set its margins
var svg = d3
  .select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // Append a group area and set margins
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  //Read census data
d3.csv("./D3_data_journalism/static/data/data.csv").then(function(censusData) {

  // Print data
// console.log(censusData)

  // Parse data converting strings to numbers
censusData.forEach(function(data) {
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
  // data.income = +data.income;    // Save for future update to dynamic scatter plot 
  // data.obesity = +data.obesity;  // ""
  // data.smokes = +data.smokes;    // ""
  // data.age = +data.age;          // ""
});

  // Create linear scale functions  (x and y axis)
var x = d3.scaleLinear()
  .domain([d3.min(censusData, function(d){ return d.poverty; }) / 1.05, 
    d3.max(censusData, function(d){ return d.poverty; }) * 1.05])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([d3.min(censusData, function(d){ return d.healthcare; }) / 1.5,
    d3.max(censusData, function(d){ return d.healthcare; }) * 1.05])
  .range([height, 0]);

  // Append axes to chart
var chartGroup = svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
var chartGroup = svg.append("g")
  .call(d3.axisLeft(y));

// Create Circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.poverty))
  .attr("cy", d => y(d.healthcare))
  .attr("r", "15")
  .attr("fill", "#4FC3F7")
  .attr("opacity", ".5");

  // Create Circle Text
var textGroup = chartGroup.selectAll("abbr")
.data(censusData)
.enter()
.append("text")
.classed("abbr", true)
.attr("x", d => x(d.poverty))
.attr("y", d => y(d.healthcare))
.text(d => d.abbr)
.attr("dominate-baseline", "middle")
.attr("text-anchor", "middle");


})