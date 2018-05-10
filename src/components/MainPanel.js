// @flow
import React, { Component } from 'react';

type Props = {
  recommendations: string[],
};
type State = {
  currentInput: string,
};
export default class MainPanel extends Component<Props, State> {
  state = {
    currentInput: '',
  };

  onClick = (command: string) => {
    const currentTerminal = window.CLI2GUI_TERMINAL_REFERENCE;
    this.props.execCLIByGUI();
    currentTerminal.io.sendString('\b'.repeat(currUserInputData.length));
    currentTerminal.io.sendString(command);
    currentTerminal.io.sendString('\n');
    this.props.execCLIByGUIDone();
  };
  render() {
    return (
      <div className="hyper-cli2gui">
        啊啊啊
      </div>
    );
  }
}
