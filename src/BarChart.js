// BarChart.js
import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './App'
import * as d3 from 'd3';
import { motion, useInView, useAnimation } from "framer-motion";

const BarChart = () => {
  const {xModal, setXModal, yModal, setYModal, hovering, setHovering, medianTypingSpeed, testDuration, displayCorrectKeystrokes, wpm, colorsArray, data, setData, viewResults, testResults} = useContext(Context);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = d3.select(svgRef.current);
  
    // Define your chart dimensions
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 40  };

    const containerWidth = window.innerWidth;

    const leftTransform = window.innerWidth*0.05 + 20;


    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([chartHeight, 0]);

// Define a color scale
const colorScale = d3.scaleOrdinal()
  .domain(data.map((d) => d.label))
  .range(colorsArray);


    // Create wpm line
    console.log("barchart", medianTypingSpeed)
    svg
    .append('line')
    .attr('transform', `translate(${leftTransform},0)`)
    .attr('class', 'average-speed-line')
    .attr('x1', 0)
    .attr('y1', yScale(medianTypingSpeed))
    .attr('x2', chartWidth)
    .attr('y2', yScale(medianTypingSpeed))
    .attr('stroke', 'red') // You can change the color of the line
    .attr('stroke-width', 2);

    // Create bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('transform', `translate(${leftTransform},0)`)
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('fill', (d) => colorScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d.value))
      .on('mouseover', function(d, i) {

        const targetElement = this;
        setXModal(targetElement.getBoundingClientRect().x + targetElement.getBoundingClientRect().width/2)
        
        setHovering(Number(i.label.split(' ')[0]))
        if (!document.getElementById("hello")) {
          const modalContainer = document.createElement("div")
          modalContainer.id = "modal-container";
          const newElement = document.createElement("div")
          newElement.id = 'hello'
          newElement.style.position = "fixed";
          newElement.textContent = testResults[Object.keys(testResults)[i.label.split(' ')[0]]].expectedLetter + `\n hi`;          newElement.style.left = d.target.x.animVal.value + 2*d.target.width.animVal.value + leftTransform+ 'px'
          newElement.style.top = document.getElementById("test-barchart").getBoundingClientRect().top + this.y.animVal.value +  'px'
          newElement.style.zIndex = Infinity
          document.querySelector(".scroll-container-x").appendChild(newElement)
        }

        // Add your logic to display the corresponding value, such as updating a tooltip
        // Example: d3.select('#tooltip').text(`Corresponding Value: ${correspondingValue}`).style('visibility', 'visible');
      })
      .on('mouseout', function() {
        // Hide corresponding value when mouse leaves the bar
        console.log('Mouse Out of Bar');
        setHovering(null)
        console.log("test4", document.getElementById("hello"))
        const remove = document.getElementById("hello")
        if (remove) remove.remove();
        document.getElementById("modal-container").remove();

        
        // Add your logic to hide the corresponding value, such as hiding the tooltip
        // Example: d3.select('#tooltip').style('visibility', 'hidden');
      });

      //add x axis title
      svg.append("text")
  .attr("class", "x-axis-label") // Optional: Apply a class for styling
  .attr("x", width / 2) // Position the text in the middle of the SVG
  .attr("y", height - 10) // Adjust the vertical position as needed
  .attr("text-anchor", "middle") // Center the text horizontally
  .text("Characters typed during test"); // Set the text for the x-axis title

        // Add y-axis title
    svg.append("text")
.attr("class", "y-axis-label")
.attr('transform', `translate(${leftTransform},0) rotate(-90)`)
// .attr("transform", "rotate(-90)") // Rotate the text to be vertical
.attr("x", 0 - height / 2) // Position the text on the left side of the y-axis
.attr("y", 0 - margin.left) // Adjust the vertical position of the y-axis title
.attr("dy", "1em") // Offset the text slightly for better alignment
.attr("text-anchor", "middle")
.text("Time Per Character (mSeconds)");


    // Create axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${leftTransform},${chartHeight})`)
      .call(d3.axisBottom(xScale).tickValues([]));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${leftTransform},0)`)
      .call(d3.axisLeft(yScale).ticks(5));



    // Return a function to clean up the chart when the component unmounts
    return () => {
      svg.selectAll('rect').remove();
      svg.selectAll('.x-axis').remove();
      svg.selectAll('.x-axis-label').remove();
      svg.selectAll('.y-axis').remove();
      svg.selectAll('.y-axis-label').remove();
    };

  }, [data, medianTypingSpeed, hovering]);



  

  return (

  //   <motion.div
  //   variants={{
  //     hidden: {opacity: 0, y: 75},
  //     visible: {opacity: 1, y: 0}
  // }}
  // initial="hidden"
  // whileInView="visible"
  // transition={{ delay: 0.2 }}
  //   >
  //       <svg ref={svgRef} width={1000} height={500}></svg>
  //   </motion.div>

<motion.div
variants={{
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
}}
initial="hidden"
whileInView="visible"
transition={{ delay: 0.2 }}
className="chart-container" // Apply a class for styling and scrolling
>
<div className="scroll-container-x"> {/* Container for x-axis scrolling */}
  <svg ref={svgRef} width={1000} height={500}></svg>
  {/* <div>
  {hovering ? 
  <div id="modal">
    <div>
      {testResults[Object.keys(testResults)[hovering]].expectedLetter}
    </div>
    <div>
      {testResults[Object.keys(testResults)[hovering]].typedInputLetter}
    </div>
    <div>
      {testResults[Object.keys(testResults)[hovering]].word}
    </div>
  </div>
  :
  <div></div>
}
</div> */}
</div>


</motion.div>
  );
};

export default BarChart;
