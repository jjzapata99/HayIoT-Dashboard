import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3General from 'd3'
import * as d3Selection from 'd3-selection'
import {ScaleLinear, ScaleTime, SelectionFn} from "d3";
d3

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  title = 'Line Chart';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width = 900 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;
  x!: ScaleTime<any, any>;
  y!: ScaleLinear<any, any>;
  private svg: any;
  private line!: d3Shape.Line<[number, number]>;
  private STOCKS: any[] = [
    {date: new Date('2010-01-01'), value: 210.73},
    {date: new Date('2010-01-04'), value: 214.01},
    {date: new Date('2010-01-05'), value: 214.38},
    {date: new Date('2010-01-06'), value: 210.97},
    {date: new Date('2010-01-07'), value: 210.58},
    {date: new Date('2010-01-08'), value: 211.98},
    {date: new Date('2010-01-11'), value: 210.11},
    {date: new Date('2010-01-12'), value: 207.72},
    {date: new Date('2010-01-13'), value: 210.65},
    {date: new Date('2010-01-14'), value: 209.43},
    {date: new Date('2010-01-15'), value: 205.93},
    {date: new Date('2010-01-18'), value: 205.93},
    {date: new Date('2010-01-19'), value: 215.04},
    {date: new Date('2010-01-20'), value: 211.72},
    {date: new Date('2010-01-21'), value: 208.07},
    {date: new Date('2010-01-22'), value: 197.75},
    {date: new Date('2010-01-25'), value: 203.08},
    {date: new Date('2010-01-26'), value: 205.94},
    {date: new Date('2010-01-27'), value: 207.88},
    {date: new Date('2010-01-28'), value: 199.29},
    {date: new Date('2010-01-29'), value: 192.06},
    {date: new Date('2010-02-01'), value: 194.73},
    {date: new Date('2010-02-02'), value: 195.86},
    {date: new Date('2010-02-03'), value: 199.23},
    {date: new Date('2010-02-04'), value: 192.05},
    {date: new Date('2010-02-05'), value: 195.46},
    {date: new Date('2010-02-08'), value: 194.12},
    {date: new Date('2010-02-09'), value: 196.19},
    {date: new Date('2010-02-10'), value: 195.12},
    {date: new Date('2010-02-11'), value: 198.67},
    {date: new Date('2010-02-12'), value: 200.38},
    {date: new Date('2010-02-15'), value: 200.38},
    {date: new Date('2010-02-16'), value: 203.40},
    {date: new Date('2010-02-17'), value: 202.55},
    {date: new Date('2010-02-18'), value: 202.93},
    {date: new Date('2010-02-19'), value: 201.67},
    {date: new Date('2010-02-22'), value: 200.42},
    {date: new Date('2010-02-23'), value: 197.06},
    {date: new Date('2010-02-24'), value: 200.66},
    {date: new Date('2010-02-25'), value: 202.00},
    {date: new Date('2010-02-26'), value: 204.62},
    {date: new Date('2010-03-01'), value: 208.99},
    {date: new Date('2010-03-02'), value: 208.85},
    {date: new Date('2010-03-03'), value: 209.33},
    {date: new Date('2010-03-04'), value: 210.71},
    {date: new Date('2010-03-05'), value: 218.95},
    {date: new Date('2010-03-08'), value: 219.08},
    {date: new Date('2010-03-09'), value: 223.02},
    {date: new Date('2010-03-10'), value: 224.84},
    {date: new Date('2010-03-11'), value: 225.50},
    {date: new Date('2010-03-12'), value: 226.60},
    {date: new Date('2010-03-15'), value: 223.84},
    {date: new Date('2010-03-16'), value: 224.45},
    {date: new Date('2010-03-17'), value: 224.12},
    {date: new Date('2010-03-18'), value: 224.65},
    {date: new Date('2010-03-19'), value: 222.25},
    {date: new Date('2010-03-22'), value: 224.75},
    {date: new Date('2010-03-23'), value: 228.36},
    {date: new Date('2010-03-24'), value: 229.37},
    {date: new Date('2010-03-25'), value: 226.65},
    {date: new Date('2010-03-26'), value: 230.90},
    {date: new Date('2010-03-29'), value: 232.39},
    {date: new Date('2010-03-30'), value: 235.84},
    {date: new Date('2010-03-31'), value: 235.00},
    {date: new Date('2010-04-01'), value: 235.97},
    {date: new Date('2010-04-02'), value: 235.97},
    {date: new Date('2010-04-05'), value: 238.49},
    {date: new Date('2010-04-06'), value: 239.54},
    {date: new Date('2010-04-07'), value: 240.60},
    {date: new Date('2010-04-08'), value: 239.95},
    {date: new Date('2010-04-09'), value: 241.79},
    {date: new Date('2010-04-12'), value: 242.29},
    {date: new Date('2010-04-13'), value: 242.43},
    {date: new Date('2010-04-14'), value: 245.69},
    {date: new Date('2010-04-15'), value: 248.92},
    {date: new Date('2010-04-16'), value: 247.40},
    {date: new Date('2010-04-19'), value: 247.07},
    {date: new Date('2010-04-20'), value: 244.59},
    {date: new Date('2010-04-21'), value: 259.22},
    {date: new Date('2010-04-22'), value: 266.47},
    {date: new Date('2010-04-23'), value: 270.83},
    {date: new Date('2010-04-26'), value: 269.50},
    {date: new Date('2010-04-27'), value: 262.04},
    {date: new Date('2010-04-28'), value: 261.60},
    {date: new Date('2010-04-29'), value: 268.64},
    {date: new Date('2010-04-30'), value: 261.09},
    {date: new Date('2010-05-03'), value: 266.35},
    {date: new Date('2010-05-04'), value: 258.68},
    {date: new Date('2010-05-05'), value: 255.98},
    {date: new Date('2010-05-06'), value: 246.25},
    {date: new Date('2010-05-07'), value: 235.86},
    {date: new Date('2010-05-10'), value: 253.99},
    {date: new Date('2010-05-11'), value: 256.52},
    {date: new Date('2010-05-12'), value: 262.09},
    {date: new Date('2010-05-13'), value: 258.36},
    {date: new Date('2010-05-14'), value: 253.82},
    {date: new Date('2010-05-17'), value: 254.22},
    {date: new Date('2010-05-18'), value: 252.36},
    {date: new Date('2010-05-19'), value: 248.34},
    {date: new Date('2010-05-20'), value: 237.76},
    {date: new Date('2010-05-21'), value: 242.32},
    {date: new Date('2010-05-24'), value: 246.76},
    {date: new Date('2010-05-25'), value: 245.22},
    {date: new Date('2010-05-26'), value: 244.11},
    {date: new Date('2010-05-27'), value: 253.35},
    {date: new Date('2010-05-28'), value: 256.88},
    {date: new Date('2010-05-31'), value: 256.88},
    {date: new Date('2010-06-01'), value: 260.83},
    {date: new Date('2010-06-02'), value: 263.95},
    {date: new Date('2010-06-03'), value: 263.12},
    {date: new Date('2010-06-04'), value: 255.96},
    {date: new Date('2010-06-07'), value: 250.94},
    {date: new Date('2010-06-08'), value: 249.33},
    {date: new Date('2010-06-09'), value: 243.20},
    {date: new Date('2010-06-10'), value: 250.51},
    {date: new Date('2010-06-11'), value: 253.51},
    {date: new Date('2010-06-14'), value: 254.28},
    {date: new Date('2010-06-15'), value: 259.69},
    {date: new Date('2010-06-16'), value: 267.25},
    {date: new Date('2010-06-17'), value: 271.87},
    {date: new Date('2010-06-18'), value: 274.07},
    {date: new Date('2010-06-21'), value: 270.17},
    {date: new Date('2010-06-22'), value: 273.85},
    {date: new Date('2010-06-23'), value: 270.97},
    {date: new Date('2010-06-24'), value: 269.00},
    {date: new Date('2010-06-25'), value: 266.70},
    {date: new Date('2010-06-28'), value: 268.30},
    {date: new Date('2010-06-29'), value: 256.17},
    {date: new Date('2010-06-30'), value: 251.53},
    {date: new Date('2010-07-01'), value: 248.48},
    {date: new Date('2010-07-02'), value: 246.94},
    {date: new Date('2010-07-05'), value: 246.94},
    {date: new Date('2010-07-06'), value: 248.63},
    {date: new Date('2010-07-07'), value: 258.66},
    {date: new Date('2010-07-08'), value: 258.09},
    {date: new Date('2010-07-09'), value: 259.62},
    {date: new Date('2010-07-12'), value: 257.28},
    {date: new Date('2010-07-13'), value: 251.80},
    {date: new Date('2010-07-14'), value: 252.73},
    {date: new Date('2010-07-15'), value: 251.45},
    {date: new Date('2010-07-16'), value: 249.90},
    {date: new Date('2010-07-19'), value: 245.58},
    {date: new Date('2010-07-20'), value: 251.89},
    {date: new Date('2010-07-21'), value: 254.24},
    {date: new Date('2010-07-22'), value: 259.02},
    {date: new Date('2010-07-23'), value: 259.94},
    {date: new Date('2010-07-26'), value: 259.28},
    {date: new Date('2010-07-27'), value: 264.08},
    {date: new Date('2010-07-28'), value: 260.96},
    {date: new Date('2010-07-29'), value: 258.11},
    {date: new Date('2010-07-30'), value: 257.25},
    {date: new Date('2010-08-02'), value: 261.85},
    {date: new Date('2010-08-03'), value: 261.93},
    {date: new Date('2010-08-04'), value: 262.98},
    {date: new Date('2010-08-05'), value: 261.70},
    {date: new Date('2010-08-06'), value: 260.09},
    {date: new Date('2010-08-09'), value: 261.75},
    {date: new Date('2010-08-10'), value: 259.41},
    {date: new Date('2010-08-11'), value: 250.19},
    {date: new Date('2010-08-12'), value: 251.79},
    {date: new Date('2010-08-13'), value: 249.10},
    {date: new Date('2010-08-16'), value: 247.64},
    {date: new Date('2010-08-17'), value: 251.97},
    {date: new Date('2010-08-18'), value: 253.07},
    {date: new Date('2010-08-19'), value: 249.88},
    {date: new Date('2010-08-20'), value: 249.64},
    {date: new Date('2010-08-23'), value: 245.80},
    {date: new Date('2010-08-24'), value: 239.93},
    {date: new Date('2010-08-25'), value: 242.89},
    {date: new Date('2010-08-26'), value: 240.28},
    {date: new Date('2010-08-27'), value: 241.62},
    {date: new Date('2010-08-30'), value: 242.50},
    {date: new Date('2010-08-31'), value: 243.10},
    {date: new Date('2010-09-01'), value: 250.33},
    {date: new Date('2010-09-02'), value: 252.17},
    {date: new Date('2010-09-03'), value: 258.77},
    {date: new Date('2010-09-06'), value: 258.77}]
  private idleTimeout:any;
  private brush:any;
  private bisect:any;
  private focus: SelectionFn<d3.BaseType, unknown, HTMLElement, any>;
  private focusText:any;



  returnParsedData(d:any){
    return {
      date : new Date(d.date),
      value : d.value
    }
  }

  private initSvg() {
    this.svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x! = d3Scale.scaleTime().range([0, this.width]);
    this.y! = d3Scale.scaleLinear().range([this.height, 0]);
    this.x!.domain(<Iterable<Number>> d3Array.extent(this.STOCKS, (d) => d.date ));
    this.y!.domain(<Iterable<Number>> d3Array.extent(this.STOCKS, (d) => d.value ));
  }

  private drawAxis() {

    var clip = this.svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", this.width )
      .attr("height", this.height )
      .attr("x", 0)
      .attr("y", 0);

     // this.brush = d3General.brushX()                 // Add the brush feature using the d3.brush function
     //  .extent( [ [0,0], [this.width,this.height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
     //  .on("end", this.updateChart)

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x!));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    this.bisect =  d3General.bisector((d:any) => {return d.x}).left;

    // Create the circle that travels along the curve of chart
    this.focus = this.svg
      .append('g')
      .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

    // Create the text that travels along the curve of chart
    this.focusText = this.svg
      .append('g')
      .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

    this.svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', this.mouseover)
      .on('mousemove', this.mousemove)
      .on('mouseout', this.mouseout);

  }

  mouseover() {
    this.focus.style("opacity", 1)
    this.focusText.style("opacity",1)
  }

  mousemove() {
    // recover coordinate we need
    var x0 = this.x.invert(d3.pointer(this)[0]);
    console.log(x0)
    var i = this.bisect(this.STOCKS, x0, 1);
    var selectedData = this.STOCKS[i]
    this.focus
      .attr("cx", this.x!(selectedData.x))
      .attr("cy", this.y(selectedData.y))
    this.focusText
      .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
      .attr("x", this.x!(selectedData.x)+15)
      .attr("y", this.y(selectedData.y))
  }
  mouseout() {
    this.focus.style("opacity", 0)
    this.focusText.style("opacity", 0)
  }

  idled() { this.idleTimeout = null; }

  // updateChart() {
  //
  //   var extent = d3Selection.selection()
  //
  //
  //   if(!extent){
  //     if (!this.idleTimeout) return this.idleTimeout = setTimeout(this.idled, 350); // This allows to wait a little bit
  //     this.x.domain([ 4,8])
  //   }else{
  //     this.x.domain([ this.x.invert(extent[0]), this.x.invert(extent[1]) ])
  //     line.select(".brush").call(this.brush.move, null) // This remove the grey brush area as soon as the selection has been done
  //   }
  //
  //   xAxis.transition().duration(1000).call(d3.axisBottom(x))
  //   line
  //     .select('.line')
  //     .transition()
  //     .duration(1000)
  //     .attr("d", d3.line()
  //       .x(function(d) { return x(d.date) })
  //       .y(function(d) { return y(d.value) })
  //     )
  // }

  private drawLine() {

    this.line = d3Shape.line()
      .x( (d: any) => this.x!(d.date) )
      .y( (d: any) => this.y(d.value) )
    ;

    this.svg.append('path')
      .datum(this.STOCKS)
      .attr('class', 'line')
      .attr('d', this.line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);


  }

  ngOnInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }
}
