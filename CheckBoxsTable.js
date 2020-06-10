import React, { Component } from 'react';
import {  Checkbox, Collapse } from 'antd';
import 'antd/dist/antd.css';

const { Panel } = Collapse;

class CheckBoxsTable extends Component {

  onChange = (checkedValues) => {
    this.props.onSelectType(checkedValues); 
  }

  render() {
    return (
      <Collapse>
        <Panel header="Type Filter">
          <div>
            <Checkbox.Group options={this.props.list} defaultValue={['All']} onChange={this.onChange} />
          </div>
        </Panel>
      </Collapse>
    );
  }
}

export default CheckBoxsTable;