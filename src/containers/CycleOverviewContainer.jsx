import React from 'react';
import { Grid } from 'semantic-ui-react'

import CycleBreakdown from '../components/CycleBreakdown.jsx';
import WellIndexBreakdown from '../components/WellIndexBreakdown.jsx';

export default class CycleOverviewContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedWells: [{position: 'A7', ct: '1.08'}, {position: 'B7', ct: '3.98'}],
      }
    }

    render() {
      return (
        <div className="overview-container">
          <h1>QCPR Data Overview</h1>
          <Grid>
            <Grid.Column width={12}>
              <CycleBreakdown/>
            </Grid.Column>
            <Grid.Column floated='right' width={4}>
              <WellIndexBreakdown selectedWells={this.state.selectedWells}/>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
}
