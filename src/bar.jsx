"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart as Chart,
  Xaxis as Xaxis,
  Yaxis as Yaxis,
  Legend as Legend,
  Grid as Grid,
} from 'react-d3-core';

import {
  default as xyChart
} from './inherit/xyPlot';

import {
  default as Bar,
} from './components/bar';


export default class BarChart extends xyChart {

  static defaultProps = {
    onMouseOver: () => {},
    onMouseOut: () => {}
  }

  render() {

    const {
      x,
      xScaleSet,
      yScaleSet,
      chartSeriesData
    } = this.state;
    const {
      chartSeries,
      showLegend,
      showXGrid,
      showYGrid,
    } = this.props;

    if(showXGrid) {
      var xgrid = <Grid type="x" {...this.props} {...this.state} />
    }

    if(showYGrid) {
      var ygrid = <Grid type="y" {...this.props} {...this.state} />
    }

    if (xScaleSet && yScaleSet) {
      // if x and y scale is all set, doing plotting...
      if(chartSeries) {
        var bars = chartSeriesData.map((d, i) => {
          return <Bar dataset={d} key={i} {...this.props} {...this.state} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}/>
        })
      }

      if(showLegend) {
        var legends = <Legend {...this.props} {...this.state} />
      }
    }

    return (
      <g>
        {xgrid}
        {ygrid}
        <g ref= "plotGroup">
          {legends}
          {bars}
        </g>
        <Xaxis {...this.props} {...this.state} setScale={this.setScale} />
        <Yaxis {...this.props} {...this.state} setScale={this.setScale} />
      </g>
    )
  }
}
