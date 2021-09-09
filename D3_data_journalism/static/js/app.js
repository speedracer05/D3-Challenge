  // Set dimensions and margins of svg chart area
var margin = {top: 20, right: 40, bottom: 100, left: 100},
  width = 900 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  // Create an SVG wrapper; append an svg group to hold the chart and set its margins
  //**Bug-fixed. label was off chart. Changed margin top & bottom from "-"" to "+"**/
  var svg = d3
  .select("#scatter")
  .append("svg")
    .attr("width", width + margin.left - margin.right)  
    .attr("height", height - margin.top + margin.bottom)
    .append("g") 
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Append a group area and set margins
var chartGroup = svg

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

    // Step 3: Append Axis to chart
    // ==============================
  var chartGroup = svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
  var chartGroup = svg.append("g")
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
    // .classed("stateCircle", true)  // MARK FOR REMOVAL
    .attr("opacity", ".5");

// Step 6: Initialize tool tip
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

  // Step 7: Create tooltip in the chart
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })

    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  var circlesText = chartGroup.selectAll("abbr")
    .data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr);
    console.log(circlesText);

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








