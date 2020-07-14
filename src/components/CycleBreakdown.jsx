import React from 'react';
import _ from 'lodash'
import { Table } from 'semantic-ui-react';
import qcprData from '../data/qpcr-data.json';

const rows = _.times(24, (i) => (
    <Table.HeaderCell key={i}>{i + 1}</Table.HeaderCell>
));

export default class CycleBreakdown extends React.Component {

    rowLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    getQpcrData() {
        const rowLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
        const maxColumnLength = 24;
        const data = qcprData;
        const wellKeys = Object.keys(data);
        let formattedData = [];
        let row = [];

        wellKeys.forEach((wellKey) => {
          let location = wellKey.split(/[:|]/);
          let well = {
            row: location[1],
            rowLetter: rowLetters[location[1] - 1],
            column: location[4],
            runs: data[wellKey],
            ct: 1,
            originalKey: wellKey,
          };

          row.push(well);

          if (well.column === maxColumnLength) {
            formattedData.push(row);
            row = [];
          }
        });
        console.log(formattedData);
        return formattedData;
      }


    render() {
        const data = this.getQpcrData();
        console.log(data);
        return (
            <div>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <input type="checkbox"></input>
                            </Table.HeaderCell>
                            {rows}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.rowLetters.map((letter) => {
                            return (<Table.Row>
                                <Table.Cell>{letter}</Table.Cell>
                                <Table.Cell >test</Table.Cell>
                                <Table.Cell>test</Table.Cell>
                                <Table.Cell>test</Table.Cell>
                            </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
