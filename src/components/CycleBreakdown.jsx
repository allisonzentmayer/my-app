import React from 'react';
import _ from 'lodash'
import { Table } from 'semantic-ui-react';

export default class CycleBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  rowLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];

  columns = _.times(24, (i) => (
    <Table.HeaderCell key={i}>{i + 1}</Table.HeaderCell>
  ));

  getWells(row) {
    return row.map((well => {
    let position = well.position;
    let gradientValue = well.ct / 40;
    let gradientCss = `rgba(143,18,18,${gradientValue})`
    let wellSelected = this.props.selectedWells.hasOwnProperty(position) ? 'selected' : '';
    return (
      <Table.Cell className='well' key={well.position} value={well} onClick={() => this.props.toggleSelectedWell(well)}>
        <span style={{backgroundColor: gradientCss}} className={'dot ' + wellSelected}></span>
      </Table.Cell>
      );
    }));
  }

  getRows() {
    const qpcrData = this.props.qpcrData;
    return qpcrData.map((row) => {
      let rowLetter = row[0].rowLetter;
      return (<Table.Row key={rowLetter}>
          <Table.Cell>{row[0].rowLetter}</Table.Cell>
          {this.getWells(row)}
        </Table.Row>);
    })
  }

  render() {
    return (
      <div>
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell/>
              {this.columns}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.getRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
