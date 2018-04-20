// @flow
import React from 'react';
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

export default (Hyper: ComponentType<*>) => (props: Object) => (
  <Hyper {...props} customChildren={() => <MainPanel {...props} />} />
);
