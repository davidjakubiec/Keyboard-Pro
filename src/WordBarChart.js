// BarChart.js
import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './App'
import * as d3 from 'd3';
import { motion, useInView, useAnimation } from "framer-motion";

const WordBarChart = () => {
  const {colorsArray, data, setData, viewResults, testResults} = useContext(Context);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Define your chart dimensions
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
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

    // Create bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('fill', (d) => colorScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d.value));

    // Create axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(5));

    // Return a function to clean up the chart when the component unmounts
    return () => {
      svg.selectAll('rect').remove();
    };

  }, [data]);



  

  return (

    <motion.div
    variants={{
      hidden: {opacity: 0, y: 75},
      visible: {opacity: 1, y: 0}
  }}
  initial="hidden"
  whileInView="visible"
  transition={{ delay: 0.2 }}
    >
        <svg ref={svgRef} width={1000} height={500}></svg>
    </motion.div>
  );
};

export default WordBarChart;
