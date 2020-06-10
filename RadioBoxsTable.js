import React, { Component } from 'react';
import {  Radio, Collapse } from 'antd';
import 'antd/dist/antd.css';

const { Panel } = Collapse;

class RadioBoxsTable extends Component {
  state = {
    value: 1,
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.onSelectPrice(e.target.value); 
  };

  render() {
    return (
        <Collapse>
        <Panel header='Price Filter'>
            <div>
                <Radio.Group onChange={this.onChange} value={ this.state.value }>
                {this.props.list.map((option, index) => {
                    const value = index + 1;
                    return(
                        <Radio value={ value }>{ option }</Radio>
                    )
                })}
                </Radio.Group>
            </div>
        </Panel>
      </Collapse>
    );
  }
}

export default RadioBoxsTable;