// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Import Data
d3.csv('assets/data/data.csv')
    .then(function (newsData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    newsData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });
  

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(newsData, d => d.poverty)])
      .range([0, width])
      ;

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(newsData, d => d.healthcare)])
      .range([height, 0])
      ;


          // Step 3: Create axis functions
    // ==============================
    //the state abbr only show up with ticks(0)
    var bottomAxis = d3.axisBottom(xLinearScale)
    .ticks(0)
    ;
    var leftAxis = d3.axisLeft(yLinearScale)
    .ticks(0)
    ;

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(newsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //Add the SVG text element to the chartGroup
    var text = chartGroup.selectAll("text")
    .data(newsData)
    .enter()
    .append("text");

    //Add svg text element attributes
    var textLabels = text   
    .attr("x", d => xLinearScale(d.poverty-.1))
    .attr("y", d => yLinearScale(d.healthcare-0.1))
    // .attr("x", xLinearScale(1))
    // .attr("y", yLinearScale(10))
    .text (d=>d.abbr)
    .attr("font-family","sans-serif")
    .attr("font-size","10px")
    .attr("fill","black")
    ;

      // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 10)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Poverty(%)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Healthcare(%)");
});