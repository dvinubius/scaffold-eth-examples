import React, { useEffect, useState } from 'react';
import {Slider, Input} from "antd";
import Loogie from './Loogie';

const LoogieEditor = ({updateColor, updateChubbiness, updateMessage}) => {
  const hue = (value) => Math.floor(360 * value / 100);
  const chubRadius = (value) => Math.floor(value * 0.7) + 35;

  const initialCol = `${hslToHex(180, 50, 50)}`;
  const initialChub = chubRadius(50);
  const initialMessage = '';

  const [col, setCol] = useState(initialCol);
  const [chub, setChub] = useState(initialChub);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    updateColor(initialCol);
    updateChubbiness(initialChub);
    updateMessage(initialMessage);
  }, [initialCol, initialChub, initialMessage]);


  const colUpdate = (value) => {
    const v = hslToHex(hue(value), 50, 50);
    setCol(v);
    updateColor(v);
  }

  const chubUpdate = (value) => {
    const v = chubRadius(value);
    setChub(v);
    updateChubbiness(v);
  };

  const msgUpdate = event => {
    const v = event.target.value;
    if (v.length > 80) {
      event.stopPropagation();
    } else {
      setMessage(v);
      updateMessage(v);
    }
  }

  return <div style={{
    display: 'flex', flexDirection: "column", alignItems: "center",
    paddingTop: '5rem',
    position: 'relative'
    }}>
    <div className="inputs" 
      style={{
        width: 300,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
      <Slider defaultValue={50} tipFormatter={hue} onChange={colUpdate}></Slider>
      <Slider defaultValue={50} tipFormatter={chubRadius} onChange={chubUpdate}></Slider>
      <Input size="large"
          placeholder='Loogie Text (max. 80 chars)'
          style={{marginTop: "1rem"}}
          autoComplete="off"
          value={message}
          onChange={msgUpdate}></Input>
    </div>
    <Loogie color={col} chubbiness={chub} message={message}/>
  </div>
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default LoogieEditor;