// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import take from 'lodash/take';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BooleanValue } from 'react-values';
import type { Dispatch } from 'redux';
import { ExpandMore, ExpandLess } from 'styled-icons/material';

import { executeCommand, PLUGIN, UI_DATA_PATH } from '../store/actions';

const Container = styled(Flex)`
  padding: 0px 3px;
`;
const Title = styled.h3`
  cursor: pointer;
  margin-bottom: 2px;
`;
const Items = styled(Flex)``;
const Item = styled.div`
  padding: 2px 5px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-right: 3px;
  margin-bottom: 3px;

  font-weight: lighter;
  cursor: pointer;
  word-break: break-all;

  & span {
    &:not(:nth-child(1)) {
      margin-left: 4px;
    }
    &:nth-child(even) {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
const ItemIndex = styled.small`
  margin-left: 2px;
  word-break: normal;
  color: rgba(255, 255, 255, 0.5);
`;
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

/** 根据不同的上下文类型，给出用不同的程序来执行命令 */
function getContextItemCommand(item: string, context: string) {
  switch (context) {
    case 'node':
      return `npm run ${item}`;
    default:
      return item;
  }
}

type Props = {
  executeCommand: string => void,
  contexts: { [type: string]: string[] },
};
class Context extends Component<Props> {
  displayLimit = 7;

  render() {
    const { contexts } = this.props;
    return (
      <Container column>
        {Object.keys(contexts).map((context: string) => (
          <BooleanValue>
            {({ value: expanded, toggle }) => {
              const contextItems = contexts[context];
              return (
                <>
                  <Title onClick={toggle}>{context}</Title>
                  <Items wrap="true">
                    {(expanded ? contextItems : take(contextItems, this.displayLimit)).map((command: string, index) => (
                      <Item
                        key={command}
                        onClick={() => {
                          this.props.executeCommand(getContextItemCommand(command, context));
                        }}
                      >
                        {command.split(' ').map((part, commandIndex) => <span key={commandIndex + part}>{part}</span>)}
                        <ItemIndex>{index}</ItemIndex>
                      </Item>
                    ))}
                  </Items>
                  {contextItems.length > this.displayLimit && (
                    <Expander center onClick={toggle}>
                      {expanded ? <ExpandLess size={12} /> : <ExpandMore size={12} />}
                    </Expander>
                  )}
                </>
              );
            }}
          </BooleanValue>
        ))}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currentUid = state.sessions.activeUid;
  return {
    contexts: state.ui?.[PLUGIN]?.[UI_DATA_PATH]?.[currentUid]?.context || {},
  };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ executeCommand }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Context);
