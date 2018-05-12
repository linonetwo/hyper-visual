// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';

import { executeCommand } from '../store/actions';

type Props = {
  currentInput: string,
  activeUid: string,
};
type State = {};
class MainPanel extends Component<Props, State> {
  onClick = (command: string) => {
    executeCommand(command, this.props.activeUid, this.props.currentInput);
  };
  render() {
    return (
      <button onClick={() => this.onClick('aaa')} className="hyper-cli2gui">
        啊啊啊
      </button>
    );
  }
}

function mapStateToProps({ sessions: { userInputs, activeUid } }) {
  return { currentInput: userInputs ? userInputs[activeUid] : '', activeUid };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
