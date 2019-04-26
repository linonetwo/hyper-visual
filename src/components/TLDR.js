// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { ExpandMore, ExpandLess } from 'styled-icons/material';
import cache from 'tldr/lib/cache';

import { executeCommand, PLUGIN, UI_DATA_PATH } from '../store/actions';

const Container = styled(Flex)`
  padding: 0px 3px;
`;
const Title = styled.h3`
  cursor: pointer;
  margin-bottom: 2px;
`;
const Info = styled(Flex)``;

// TODO: use https://github.com/AllThingsSmitty/css-protips#use-max-height-for-pure-css-sliders
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
console.log(cache);

type Props = {
  historyItems: string[],
};
type State = {
  expanded: boolean,
};
class TLDR extends Component<Props, State> {
  state = { expanded: false };

  expandArea = () =>
    this.setState(({ expanded: prevExpanded }) => ({
      expanded: !prevExpanded,
    }));

  displayLimit = 10;

  render() {
    const { expanded } = this.state;
    const { historyItems } = this.props;
    return (
      <Container column>
        <Title onClick={this.expandArea}>TLDR</Title>
        <Info wrap="true">
          aaaa
        </Info>
        {historyItems.length > this.displayLimit && (
          <Expander center onClick={this.expandArea}>
            {expanded ? <ExpandLess size={12} /> : <ExpandMore size={12} />}
          </Expander>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currentUid = state.sessions.activeUid;
  return {
    historyItems: state.ui?.[PLUGIN]?.[UI_DATA_PATH]?.[currentUid]?.history || [],
  };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ executeCommand }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TLDR);
