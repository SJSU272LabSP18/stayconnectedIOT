import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Linechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      displayTitle: props.displayTitle
    };
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: this.state.displayTitle,
              fontsize: 25
            },
            layout: {
              padding: {
                left: 15,
                right: 0,
                bottom: 0,
                top: 0
              }
            },
            legend: {
              display: true,
              position: 'right'
            },
            tooltips: {
              enabled: true
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}
export default Linechart;
