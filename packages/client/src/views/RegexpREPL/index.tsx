import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Match from './match';
import './index.scss';

interface Props {};

const RegexpREPL: FC<Props> = () => {
  const [matchResult, setMatchResult] = useState([]);
  const [regExp, setRegExp] = useState('');
  const [string, setString] = useState('');
  const [flags, setFlags] = useState({
    g: false,
    m: false,
    i: false,
  });
  const [regExpError, setRegExpError] = useState<SyntaxError>({ name: 'SyntaxError', message: '' });
  
  useEffect(() => {
    let regexpInst;
    const flag = Object.keys(flags).filter(k => flags[k]).join('');
    try {
      regexpInst = new RegExp(regExp, flag);
    } catch(e) {
      setRegExpError(e);
    }
    if (regExp && string) {
      const result = string.match(regexpInst);
      console.log(result)
      setMatchResult(result);
    }
  }, [regExp, string, flags]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'regExp') {
      setRegExp(value);
      setRegExpError(state => ({ ...state, message: '' }))
    };
    if (name === 'string') setString(value);
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFlags(state => ({ ...state, [name]: checked }));
  }

  return (
    <div className="repl">
      <div className="input-container">
        <div className="regexp-input">
          <h4>正则表达式</h4>
          <input type="text" name="regExp" value={regExp} onChange={handleChange} />
          <div className="flags">
            <label htmlFor="global">
              <span>全局匹配：</span>
              <input
                type="checkbox"
                name="g" 
                id="global"
                checked={flags.g}
                onChange={handleCheck}
              />
            </label>
            <label htmlFor="mutliple">
              <span>多行匹配：</span>
              <input
                type="checkbox"
                name="m" 
                id="mutliple"
                checked={flags.m}
                onChange={handleCheck}
              />
            </label>
            <label htmlFor="ignoreCase">
              <span>忽略大小写：</span>
              <input
                type="checkbox"
                name="i" 
                id="ignoreCase"
                checked={flags.i}
                onChange={handleCheck}
              />
            </label>
          </div>
          {regExpError.message && <h4 className="error">{regExpError.message}</h4>}
        </div>
        <div className="string-input">
          <h4>匹配字符串</h4>
          <textarea name="string" value={string} onChange={handleChange} />
        </div>
      </div>
      <div className="output-container">
        <h4>匹配结果</h4>
        <div className="output">
          <Match result={matchResult} global={flags.g} />
        </div>
      </div>
    </div>
  )
}

export default RegexpREPL;
