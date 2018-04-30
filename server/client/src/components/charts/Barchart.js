import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Barchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      displayTitle: props.displayTitle
    };

    console.log(this.props);
    console.log('Im here');
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: this.state.displayTitle,
              fontsize: 25
            },
            layout: {
              padding: {
                left: 10,
                right: 0,
                bottom: 0,
                top: 0
              }
            },
            legend: {
              display: false,
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
export default Barchart;
