import React from 'react';
import TLDR from './TLDR';
import History from './History';
import Context from './Context';

export default function getBlocks(type) {
  return (
    <div className="block" key={type}>
      {do {
        if (type === 'tldr') {
          <TLDR />;
        } else if (type === 'history') {
          <History />;
        } else if (type === 'context') {
          <Context />;
        }
      }}
    </div>
  );
}
