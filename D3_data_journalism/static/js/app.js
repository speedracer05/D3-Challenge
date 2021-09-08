  // Set dimensions and margins of svg chart area
  // ********************************************
var margin = {top: 80, right: 20, bottom: 80, left: 50},
  width = 900 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

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

      // Initialize tool tip
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`${d.state}<br>Poverty: ${d.poverty} % <br> Healthcare ${d.healthcare} %`);
  });

  // Create Circles and event listner to show/hide the tooltip
  var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.poverty))
    .attr("cy", d => y(d.healthcare))
    .attr("r", "15")
    .attr("fill", "#4FC3F7")
    .classed("stateCircle", true)
    .attr("opacity", ".5")
    .on("mouseover", toolTip.show)
    .on("mouseover", toolTip.hide);

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Healthcare");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty (%)");

    // Add text to each circles
  var circlesText = chartGroup.selectAll("text")
    .data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr);
    console.log(circlesText);
  });
    
    // .attr("dx", d => x(d[poverty]))
    // .attr("dy", d => y(d[healthcare]) + 5)
    // .classed("stateText", true);


  // var textGroup = chartGroup.selectAll("abbr")
  // .data(censusData)
  // .enter()
  // .append("text")
  // .classed("abbr", true)
  // .attr("x", d => x(d.poverty))
  // .attr("y", d => y(d.healthcare))
  // .text(d => d.abbr)
  // .attr("dominate-baseline", "middle")
  // .attr("text-anchor", "middle");



    // Create tooltip in the chart
  // chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
  // circlesGroup.on("click", function(data) {
  //   toolTip.show(data, this);
  // })
  //   // onmouseout event
  // .on("mouseout", function(data, index) {
  //   toolTip.hide(data);
  // });

