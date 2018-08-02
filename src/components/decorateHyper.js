// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

import { SEARCH_HISTORY_FULFILL, searchHistoryFulfill, SEARCH_CONTEXT_FULFILL, searchContextFulfill, TOGGLE_GUI, toggleGUI } from '../store/actions';
import MainPanel from './MainPanel';

export default (Hyper: ComponentType<*>) =>
  class DecorateHyper extends Component<*> {
    componentDidMount() {
      window.rpc.on(SEARCH_HISTORY_FULFILL, results => window.store.dispatch(searchHistoryFulfill(results)));
      window.rpc.on(SEARCH_CONTEXT_FULFILL, results => window.store.dispatch(searchContextFulfill(results)));
      window.rpc.on(TOGGLE_GUI, () => window.store.dispatch(toggleGUI()));
    }

    render() {
      return <Hyper {...this.props} customChildren={<MainPanel {...this.props} />} />;
    }
  };
