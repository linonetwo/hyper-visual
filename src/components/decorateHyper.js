// @flow
import React, { Component } from 'react';

import type { ComponentType } from 'react';

import MainPanel from './MainPanel';

export default (Hyper: ComponentType<*>) =>
  class DecorateHyper extends Component<*> {
    render() {
      return <Hyper {...this.props} customChildren={<MainPanel {...this.props} />} />;
    }
  };
