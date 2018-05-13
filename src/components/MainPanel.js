// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import MdClose from 'react-icons/lib/md/close'

import { toggleGUI } from '../store/actions';

type Props = {
  toggleGUI: () => void,
};
type State = {};
class MainPanel extends Component<Props, State> {
  toggleGUI = () => {
    this.props.toggleGUI();
  };
  render() {
    return (
      <div className="hyper-cli2gui">
        <div className="title-bar">
          <MdClose />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ toggleGUI }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
