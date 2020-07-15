import React from 'react';
import {  Table } from 'semantic-ui-react'
export default class WellIndexBreakdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
        const selectedWells = this.props.selectedWells;
        const selectedWellPositions = Object.keys(selectedWells);
        const selectedWellRows = selectedWellPositions.map((position) => {
                            const ct = selectedWells[position];
                            return (<Table.Row key={position}>
                                <Table.Cell>{position}</Table.Cell>
                                <Table.Cell>{ct}</Table.Cell>
                            </Table.Row>)});
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Well Index</Table.HeaderCell>
                            <Table.HeaderCell>Ct</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {selectedWellRows}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
