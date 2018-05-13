// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import take from 'lodash/take';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import MdExpandMore from 'react-icons/lib/md/expand-more';
import MdExpandLess from 'react-icons/lib/md/expand-less';

import { executeCommand, UI_DATA_PATH } from '../store/actions';

const Container = styled(Flex)``;
const Title = styled.h3`
  cursor: pointer;
  padding-left: 10px;
`;
const Items = styled.div`
  padding-left: 3px;
`;
const Item = styled.div``;
const Expander = styled(Flex)`
  cursor: pointer;
  width: 100%;
  height: 30px;
  background-color: #ccc;
  opacity: 0.1;
  &:hover {
    opacity: 0.5;
  }
  margin-top: 10px;
`;

type Props = {
  executeCommand: string => void,
  historyItems: string[],
};
type State = {
  expanded: boolean,
};
class MainPanel extends Component<Props, State> {
  state = { expanded: false };
  expandArea = () => this.setState({ expanded: !this.state.expanded });

  displayLimit = 10;

  render() {
    return (
      <Container column>
        <Title onClick={this.expandArea}>history</Title>
        <Items>
          {(this.state.expanded ? this.props.historyItems : take(this.props.historyItems, this.displayLimit)).map(
            command => (
              <Item
                key={command}
                onClick={() => {
                  this.props.executeCommand(command);
                }}
              >
                {command}
              </Item>
            ),
          )}
        </Items>
        {this.props.historyItems.length > this.displayLimit && (
          <Expander center onClick={this.expandArea}>
            {this.state.expanded ? <MdExpandLess /> : <MdExpandMore />}
          </Expander>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currentUid = state.sessions.activeUid;
  return {
    historyItems: state.ui?.[UI_DATA_PATH]?.[currentUid]?.history || [],
  };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ executeCommand }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
