import React, { useRef, useEffect, useContext } from 'react';
import { Context } from '../App'
import * as d3 from 'd3';

const UserTestHistoryAccuracyLineGraph = () => {
  const {userHistory, setUserHistory} = useContext(Context);
  const svgRef = useRef(null);

  useEffect(() => {
    // Function to create the chart
    const createChart = () => {

      // const data = Array.from({ length: 10 }, (_, i) => ({
      //   testNumber: i + 1,
      //   accuracy: Math.floor(Math.random() * 75) + 25, // Random value between 25 and 225
      // }));

      const data = [];
      if (userHistory) {
        for (let i = 0; i < userHistory.length; i++) {
          data.push({
            testNumber: i+1,
            accuracy: userHistory[i].accuracy
          })
        }
      }


      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = window.innerWidth * 0.4 - margin.left - margin.right;
      const height = window.innerHeight * 0.2 - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.testNumber.toString()))
        .range([0, width])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .nice()
        .range([height, 0]);

      svg.selectAll('.x-axis').remove(); // Remove existing x-axis to prevent duplication on resize
      svg.selectAll('.y-axis').remove(); // Remove existing y-axis to prevent duplication on resize

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .selectAll('text')
        .attr('dy', '1em')
        .style('text-anchor', 'middle');

      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale).ticks(9).tickSize(-width).tickSizeInner(0))
        .call(g => g.selectAll('.domain').remove());

      const line = d3
        .line()
        .x(d => xScale(d.testNumber.toString()) + xScale.bandwidth() / 2)
        .y(d => yScale(d.accuracy));

      svg.selectAll('.line').remove(); // Remove existing line to prevent duplication on resize

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

      // X-axis label
      svg.selectAll('.x-axis-label').remove(); // Remove existing label to prevent duplication on resize
      svg.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .style('text-anchor', 'middle')
        .text('Test Number');

      // Y-axis label
      svg.selectAll('.y-axis-label').remove(); // Remove existing label to prevent duplication on resize
      svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Accuracy (%)');
    };

    // Initial chart creation
    createChart();

    // Function to handle window resize
    const handleResize = () => {
      createChart();
    };

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userHistory]); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return <svg ref={svgRef}></svg>;
};

export default UserTestHistoryAccuracyLineGraph;
