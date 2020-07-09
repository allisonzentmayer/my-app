import React from 'react';
import _ from 'lodash'
import { Table } from 'semantic-ui-react';

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

    render() {
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
                                <Table.Cell>test</Table.Cell>
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