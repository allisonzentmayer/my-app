import React from 'react';
import {  Table } from 'semantic-ui-react'
export default class WellIndexBreakdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
        const selectedWells = this.props.selectedWells.map((well) => {
                            return (<Table.Row>
                                <Table.Cell>{well.position}</Table.Cell>
                                <Table.Cell>{well.ct}</Table.Cell>
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
                        {selectedWells}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
