import React from 'react';
import History from './History';

export default function getBlocks(type) {
  return (
    <div className="block" key={type}>
      {do {
        if (type === 'history') {
          <History />;
        }
      }}
    </div>
  );
}
