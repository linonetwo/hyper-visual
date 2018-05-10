// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import type { ComponentType } from 'react';
import type { Dispatch } from 'redux';

import MainPanel from './MainPanel';
import { updateRecommendation } from '../store/actions';

export function mapHyperDispatch(dispatch: Dispatch<any>, prevMap: Object) {
  return {
    ...prevMap,
    ...bindActionCreators({ updateRecommendation }, dispatch),
  };
}

export default (Hyper: ComponentType<*>) =>
  class DecorateHyper extends Component<*> {
    render() {
      return <Hyper {...this.props} customChildren={<MainPanel {...this.props} />} />;
    }
  };
