// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';

import { executeCommand } from '../store/actions';

type Props = {
  executeCommand: string => void,
};
type State = {};
class MainPanel extends Component<Props, State> {
  onClick = (command: string) => {
    this.props.executeCommand(command);
  };
  render() {
    return (
      <button onClick={() => this.onClick('ls')} className="hyper-cli2gui">
        啊啊啊
      </button>
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ executeCommand }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
