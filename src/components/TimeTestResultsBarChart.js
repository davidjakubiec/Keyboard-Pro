// BarChart.js
import React, { useRef, useEffect, useContext } from 'react';
import { Context } from '../App'
import * as d3 from 'd3';
import { motion, useInView, useAnimation } from "framer-motion";

const TimeTestResultsBarChart = () => {
  const {byLetterBarChartData} = useContext(Context);
  const data = byLetterBarChartData

  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.letter))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.time)])
      .nice()
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.time))
      .attr('height', d => height - y(d.time))
      .style('fill', 'green') // Set the fill color to white
      .style('stroke', 'green'); // Set the stroke color to white

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', 'white'); // Set x-axis label color to white


      svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('x', width / 2) // Centered horizontally
      .attr('y', height + margin.top + 40) // Adjust the vertical position as needed
      .style('text-anchor', 'middle')
      .text('X-Axis Title'); // Adjust the title text as needed
      

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', 'white'); // Set y-axis label color to white

  
    // Append Y-axis title
    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .style('fill', 'white') // Set text color to white
      .text('Average Time Per Letter (mSecodns)');

      return () => {
        // Clean up SVG content when the component is unmounted
        svg.selectAll('*').remove();
      };

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};


export default TimeTestResultsBarChart