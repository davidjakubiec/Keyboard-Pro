import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './App';
import * as d3 from 'd3';

const LineChart = () => {
  const { lineChartYData, lineChartXData } = useContext(Context);
  const yData = lineChartYData;
  const xData = lineChartXData;
  const width = 1000;
  const height = 1000;

  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    // Use ordinal scale for x-axis
    const xScale = d3
      .scaleBand()
      .domain(xData) // Assuming xData is an array of strings
      .range([margin.left, innerWidth + margin.left])
      .padding(0.1); // Adjust padding as needed

    const yScale = d3
      .scaleLinear()
      .domain([0, 200]) // Assuming yData is an array of numeric values
      .nice()
      .range([innerHeight + margin.top, margin.top]);

    // Create line generator
    const line = d3.line()
      .x((d, i) => xScale(xData[i]) + xScale.bandwidth() / 2) // Center the line on x-axis labels
      .y(d => yScale(d));

    svg
      .append('path')
      .datum(yData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg
      .selectAll('.dot')
      .data(yData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScale(xData[i]) + xScale.bandwidth() / 2) // Center the dots on x-axis labels
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .attr('fill', 'steelblue');

    svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

  }, [xData, yData]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;