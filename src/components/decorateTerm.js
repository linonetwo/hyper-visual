// @flow
import React from 'react';
import type { ComponentType } from 'react';

export default (Term: ComponentType<*>) => (props: Object) => (
  <Term
    {...props}
    onTerminal={terminal => {
      if (props.onTerminal) props.onTerminal(terminal);
      window.CLI2GUI_TERMINAL_REFERENCE = terminal;
    }}
  />
);
