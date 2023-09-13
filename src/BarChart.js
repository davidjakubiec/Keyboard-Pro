// BarChart.js
import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './App'
import * as d3 from 'd3';

const BarChart = () => {
  const {data, setData, viewResults, testResults} = useContext(Context);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Define your chart dimensions
    const width = 500;
    const height = 300;
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

    // Create bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
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

    <div>
        
        <svg ref={svgRef} width={500} height={300}></svg> : <div></div> 
    </div>
  );
};

export default BarChart;
