// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import MdClose from 'react-icons/lib/md/close';

import { toggleGUI } from '../store/actions';
import getBlocks from './getBlocks';

const Container = styled(Flex)`
  position: fixed;
  top: 50px;
  right: 10px;
  width: 30%;
  min-width: 200px;
  max-width: 500px;
  overflow: auto;
  z-index: 3;
`;
const TitleBar = styled(Flex)`
  height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 24px;
`;

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
      <Container column>
        <TitleBar justifyEnd alignCenter>
          <MdClose />
        </TitleBar>
        {getBlocks('history')}
      </Container>
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
