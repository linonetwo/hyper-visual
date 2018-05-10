// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';

import { SESSION_USER_DATA } from '../store/actions';

type Props = {
  SESSION_USER_DATA: Function,
  currentInput: string,
};
type State = {
  currentInput: string,
};
class MainPanel extends Component<Props, State> {
  state = {
    currentInput: '',
  };

  onClick = (command: string) => {
    // this.props.execCLIByGUI();
    this.props.SESSION_USER_DATA('\b'.repeat(this.props.currentInput.length));
    this.props.SESSION_USER_DATA(command);
    this.props.SESSION_USER_DATA('\n');
    // this.props.execCLIByGUIDone();
  };
  render() {
    return (
      <div onClick={() => this.onClick('aaa')} className="hyper-cli2gui">
        啊啊啊
      </div>
    );
  }
}

function mapStateToProps({ sessions: { userInputs, activeUid } }) {
  return { currentInput: userInputs ? userInputs[activeUid] : '' };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ SESSION_USER_DATA }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
