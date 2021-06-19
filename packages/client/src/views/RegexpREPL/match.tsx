import React, { FC } from 'react';
import './index.scss';

interface Props {
  result: RegExpMatchArray;
  global?: boolean;
};

const Match: FC<Props> = ({ result, global }) => {

  function getResult() {
    if (global) {
      return result?.join('; ');
    }
    return result?.[0];
  }

  function getAllGroups() {
    if (global) return;
    let groups = '';
    for (let i = 1; i < result?.length; i++) {
      if (RegExp[`$${i}`]) {
        groups +=`RegExp.$${i}: ${RegExp[`$${i}`]}; `;
      }
    }
    return groups;
  }

  function getNamedGroups() {
    if (global) return;
    const { groups } = result || {};
    return Object.keys(groups || {}).map(k => `${k}: ${groups[k]}; `)
  }

  return (
    <table className="match-table">
      <thead>
        <tr>
          <th>matched</th>
          <th>all groups</th>
          <th>named groups</th>
          <th>index</th>
          <th>input</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getResult()}</td>
          <td>{getAllGroups()}</td>
          <td>{getNamedGroups()}</td>
          <td>{result?.index}</td>
          <td>{result?.input}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Match;
