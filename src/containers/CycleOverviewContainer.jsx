import React from 'react';
import { Grid, Checkbox } from 'semantic-ui-react'

import CycleBreakdown from '../components/CycleBreakdown.jsx';
import WellIndexBreakdown from '../components/WellIndexBreakdown.jsx';
import qpcrJson from '../data/qpcr-data.json';

export default class CycleOverviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWells: {},
      checked: false,
    }
    this.toggleSelectedWell = this.toggleSelectedWell.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  rowLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];

  getQpcrData() {
    const maxColumnLength = 24;
    const data = qpcrJson;
    const wellKeys = Object.keys(data);
    let formattedData = [];
    let row = [];

    wellKeys.forEach((wellKey) => {
      let location = wellKey.split(/[:|]/);
      let rowLetter = this.rowLetters[location[1] - 1];
      let well = {
        row: location[1],
        rowLetter: rowLetter,
        column: location[4],
        runs: data[wellKey],
        ct: this.calculateThresholdCycle(data[wellKey]),
        originalKey: wellKey,
        position: this.getWellPosition(wellKey),
      };

      row.push(well);

      if (well.column == maxColumnLength) {
        formattedData.push(row);
        row = [];
      }
    });
    return formattedData;
  }

  getWellPosition(wellKey) {
    let location = wellKey.split(/[:|]/);
    let rowLetter = this.rowLetters[location[1] - 1];
    return rowLetter + location[4];
  }

  calculateThresholdCycle(runs) {
    const thresholdValue = 104;
    let thresholdCycle;
    for(var i=0;i<runs.length;i++) {
      let run = runs[i];
      if (run.fluorescence > thresholdValue) {
        thresholdCycle = i;
        break;
      }
      thresholdCycle = 40;
    }
    return thresholdCycle;
  }

  toggleSelectedWell(well) {
    let selectedWells = this.state.selectedWells;
    let position = well.position;
    if (selectedWells.hasOwnProperty(position)) {
      delete selectedWells[position];
    } else {
      selectedWells[position] = well.ct;
    }
    this.setState({selectedWells: selectedWells});
  }

  toggleSelectAll() {
    let selectedWells = this.state.selectedWells;
    if (!this.state.checked) {
      let keys = Object.keys(qpcrJson);
      keys.forEach((key) => {
        let runs = qpcrJson[key];
        let wellPosition = this.getWellPosition(key);
        let ct = this.calculateThresholdCycle(runs);
        selectedWells[wellPosition] = ct;
      });
    } else {
      selectedWells = {};
    }
    this.setState({selectedWells: selectedWells, checked: !this.state.checked});
  }

  toggleSelect(element) {
    const data = this.getQpcrData();
    const wells = data.flat();
    let selectedWells = this.state.selectedWells;
    if (this.rowLetters.includes(element)) {
      wells.filter((well) =>  well.rowLetter == element)
        .forEach((well) => {
          selectedWells[well.position] = well.ct;
        });
    } else {
      wells.filter((well) =>  well.column == element)
      .forEach((well) => {
        selectedWells[well.position] = well.ct;
      });
    }
    this.setState({selectedWells: selectedWells});
  }

  render() {
    return (
      <div className="overview-container">
        <h1>qPCR Overview</h1>
        <Grid>
          <Grid.Column width={12}>
            <CycleBreakdown
              qpcrData={this.getQpcrData()}
              selectedWells={this.state.selectedWells}
              toggleSelectedWell={this.toggleSelectedWell}
              toggleSelectAll={this.toggleSelectAll}
              toggleSelect={this.toggleSelect}
              />
            <Checkbox label={{ children: 'Select All' }} onChange={this.toggleSelectAll} checked={this.state.checked} />
          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <WellIndexBreakdown selectedWells={this.state.selectedWells}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
