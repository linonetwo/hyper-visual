// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

export default (Term: ComponentType<*>) =>
  class DecorateTerm extends Component<*> {
    render() {
      return (
        <Term
          {...this.props}
          onDecorated={terminal => {
            if (this.props.onDecorated) this.props.onDecorated(terminal);
            window.CLI2GUI_TERMINAL_REFERENCE = terminal;
          }}
        />
      );
    }
  };
