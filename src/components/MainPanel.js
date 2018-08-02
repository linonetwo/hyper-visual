// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { Close } from 'styled-icons/material';

import { PLUGIN, toggleGUI } from '../store/actions';
import getBlocks from './getBlocks';

const Container = styled(Flex)`
  position: fixed;
  top: ${({ top }) => top || '35px'};
  right: 0px;
  width: 30%;
  min-width: 200px;
  max-height: calc(100vh - ${({ top }) => top || '35px'});
  overflow: auto;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;

  ${is('closed')`
    display: none;
  `};

  ::-webkit-scrollbar {
    display: none;
  }
  font-family: Monospaced Number, Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
`;
const TitleBar = styled(Flex)`
  height: 30px;
  min-height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 24px;

  & svg {
    cursor: pointer;
  }
`;

type Props = {
  toggleGUI: () => void,
  opened: boolean | void | null,
  top?: number,
};
type State = {};
class MainPanel extends Component<Props, State> {
  render() {
    const { top, opened } = this.props;
    return (
      <Container column closed={!opened} top={top}>
        <TitleBar justifyEnd alignCenter>
          <Close onClick={this.props.toggleGUI} size={16} />
        </TitleBar>
        {getBlocks('history')}
        {getBlocks('context')}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const UIState = state.ui?.[PLUGIN] || {};
  return { opened: UIState.opened, top: UIState.top };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ toggleGUI }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPanel);
