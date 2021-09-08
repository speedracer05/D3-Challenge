  // Set dimensions and margins of svg chart area
  // ********************************************
var margin = {top: 80, right: 20, bottom: 80, left: 50},
  width = 400 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

  // Append the svg object to the body of the page and set its margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g") // Append a group area and set margins
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


  //Read census data
d3.csv("./D3_data_journalism/static/data/data.csv").then(function(censusData) {
  // Print data
console.log(censusData)

  // Visualize the data
  visualize(censusData);

  // Parse data converting strings to numbers
censusData.forEach(function(data) {
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
  // data.income = +data.income;    // Save for future update to dynamic scatter plot 
  // data.obesity = +data.obesity;  // ""
  // data.smokes = +data.smokes;    // ""
  // data.age = +data.age;          // ""
});

  // Create scale functions  (x and y axis)
var x = d3.scaleLinear()
  .domain([d3.min(censusData, function(d){ return d.poverty; }) / 1.05, 
  d3.max(censusData, function(d){ return d.poverty; }) * 1.05])
  .range([0, 800]);

var y = d3.scaleLinear()
  .domain([d3.min(censusData, function(d){ return d.healthcare; }) / 1.05,
  d3.max(censusData, function(d){ return d.healthcare; }) * 1.05])
  .range([500, 0]);

  // Append axes to chart
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
svg.append("g")
  .call(d3.axisLeft(y));


    // Add circle for each item in the array
    var circles = d3
    .select("#scatter")
    .selectAll("circle")
    .data(data);

    circles
    .enter()
    .append("circle")
    .attr("cx", function(d){ return x(d.poverty); })
    .attr("cy", function(d, i){ return y(d.healthcare); })
    .attr("r", 16)
    .attr("fill", "#4FC3F7")
    .att("opacity", ".5");


  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(censusData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.healthcare); } )
      .attr("cy", function (d) { return y(d.poverty); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")
})