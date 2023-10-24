import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './App'
import * as d3 from 'd3';

const Heatmap = () => {
    const {heatMapData} = useContext(Context);


  const svgRef = useRef();
  //calculate based off of screen size
  const cellSize = 40;
  const width = Object.keys(heatMapData).length * cellSize;
  const height = Object.keys(heatMapData).length * cellSize;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const keys = Object.keys(heatMapData);

    const cells = svg.selectAll('g')
      .data(keys)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * cellSize})`);

    cells.selectAll('rect')
      .data(d => keys.map(key => ({ key, value: heatMapData[key][d] || 0 })))
      .enter().append('rect')
      .attr('x', (d, i) => i * cellSize)
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fill', d => {
        const colorScale = d3.scaleLinear()
          .domain([0, d3.max(keys, key => heatMapData[key][d.key] || 0)])
          .range(['white', 'steelblue']);
        return colorScale(d.value);
      });

    cells.selectAll('text')
      .data(d => keys.map(key => heatMapData[key][d] || 0))
      .enter().append('text')
      .attr('x', (d, i) => i * cellSize + cellSize / 2)
      .attr('y', cellSize / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d);

    svg.append('g')
      .selectAll('text')
      .data(keys)
      .enter().append('text')
      .attr('x', -10)
      .attr('y', (d, i) => i * cellSize + cellSize / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text(d => d);
  }, [heatMapData]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default Heatmap;
