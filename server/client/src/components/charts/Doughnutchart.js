import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Doughnutchart extends Component {
  constructor(props) {
    super(props);
    console.log(props.chartData);
    this.state = {
      chartData: props.chartData,
      displayTitle: props.displayTitle
    };
  }

  render() {
    return (
      <div className="chart ">
        <Doughnut
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
export default Doughnutchart;
