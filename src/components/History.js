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

const Container = styled(Flex)`
  padding: 0px 3px;
`;
const Title = styled.h3`
  cursor: pointer;
  margin-bottom: 2px;
`;
const Items = styled(Flex)``;
const Item = styled(Flex)`
  padding: 2px 5px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-right: 3px;
  margin-bottom: 3px;

  font-weight: lighter;
  cursor: pointer;
  word-break:break-all;
`;
const ItemIndex = styled.small`
  margin-left: 2px;
  word-break: normal;
  color: rgba(255, 255, 255, 0.5);
`;
const Expander = styled(Flex)`
  cursor: pointer;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
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
        <Items wrap="true">
          {(this.state.expanded ? this.props.historyItems : take(this.props.historyItems, this.displayLimit)).map(
            (command: string, index) => (
              <Item
                center
                key={command}
                onClick={() => {
                  this.props.executeCommand(command);
                }}
              >
                {command}
                <ItemIndex>{index}</ItemIndex>
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
