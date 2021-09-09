// Set dimensions and margins of svg chart area
var margin = {top: 20, right: 40, bottom: 100, left: 45},
svgWidth = 900 - margin.left - margin.right,
svgHeight = 600 - margin.top - margin.bottom;

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper; append an svg group to hold the chart and set its margins
  var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", svgWidth)  
    .attr("height", svgHeight);

// Append a group area and set margins
var chartGroup = svg.append("g") 
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read census data
d3.csv("./D3_data_journalism/static/data/data.csv").then(function(censusData) {

// Step 1: Parse Data/Cast as numbers
// ==============================
  censusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    // data.income = +data.income;    // Save for future update to dynamic scatter plot 
    // data.obesity = +data.obesity;  // ""
    // data.smokes = +data.smokes;    // ""
    // data.age = +data.age;          // ""
  });

    // Step 2: Create scale functions
    // ==============================
  var x = d3.scaleLinear()
    .domain([d3.min(censusData, function(d){ return d.poverty; }) / 1.05, 
      d3.max(censusData, function(d){ return d.poverty; }) * 1.05])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([d3.min(censusData, function(d){ return d.healthcare; }) / 1.5,
      d3.max(censusData, function(d){ return d.healthcare; }) * 1.05])
    .range([height, 0]);

    // Step 3: Create and append Axes to chart
    // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  chartGroup.append("g")
    .call(d3.axisLeft(y));

  // Step 4: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.poverty))
    .attr("cy", d => y(d.healthcare))
    .attr("r", "15")
    .attr("fill", "#76A9F9")
    .attr("opacity", ".5");

// Step 5: Initialize tool tip
// ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .style("background-color", "#F9C676")
    .style("border-radius", "5px")
    .style("padding", "2px")
    .style("color", "black")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>Poverty: ${d.poverty} % <br> Healthcare: ${d.healthcare} %`);
  });

  // Step 6: Create tooltip in the chart
  //==============================
  chartGroup.call(toolTip);

  // Step 7: Create event listeners to display and hide the tooltip
  //==============================
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })

    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  // Create circle text
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

  // Create axes labels
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");

  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty (%)");
  
}).catch(function(error) {
  console.log(error);
});
