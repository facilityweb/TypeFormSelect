import React, { useState } from 'react';
import './index.css';

const selectStyle = {
  display: 'block',
  width: '700px',
  fontFamily: 'inherit',
  color: 'rgb(1, 66, 172)',
  padding: '0px 24px 8px 0px',
  border: 'none',
  outline: 'none',
  borderRadius: '0px',
  appearance: 'none',
  background: 'none',
  transform: 'translateZ(0px)',
  fontSize: '30px',
  lineHeight: 'unset',
  transition: 'box-shadow 0.1s ease-out 0s',
  marginTop: 32,
  boxShadow: 'rgba(1, 66, 172, 0.3) 0px 1px',
}
const optionDivStyle = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: 'rgb(230, 236, 247)',
  boxShadow: 'rgba(1, 66, 172, 0.6) 0px 0px 0px 1px inset',
  color: 'rgb(1, 66, 172)',
  maxWidth: '100%',
  minWidth: '75px',
  minHeight: '40px',
  outline: '0px',
  padding: '4px',
  transitionDuration: '0.1s',
  transitionProperty: 'background-color, color, border-color, opacity, box-shadow',
  transitionTimingFunction: 'ease-out',
  width: '100%',
  cursor: 'pointer',
  opacity: '1',
  margin: 6
}

const OptionsDiv = ({ options, boldText, onClick }) => (
  <div className="fade-in">
    {options.map(o => {
      let value = o.value;
      let valueCmp;
      const hasBoldText = boldText && o.value.indexOf(boldText) !== -1;
      if (hasBoldText) {
        const valueSplitted = value.split(boldText);
        valueCmp = (
          <>
            {valueSplitted[0]}
            <strong>{boldText}</strong>
            {valueSplitted.slice(1, valueSplitted.length).reduce((a, b) => a + b)}
          </>
        );
      }

      return (
        <label onClick={() => onClick(o)} style={optionDivStyle} key={o.key}>{valueCmp || value}</label>
      );
    })}
  </div>
);


export default ({ placeholder, options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState();
  const optionsToShow = !value ? options : options.filter(o => o.value.indexOf(value) !== -1);

  const optionClickCallback = (v) => {
    const newValue = options.find(o => o.key === v.key).value;
    setValue(newValue);
  };
  const inputChangeCallback = (e) => {
    setValue(e.target.value);
    setShowOptions(e.target.value && e.target.value.length);
  }

  return (
    <div>
      <input onChange={inputChangeCallback} value={value} onClick={() => setShowOptions(!showOptions)} placeholder={placeholder} style={selectStyle} />
      {
        !showOptions ? null : <OptionsDiv onClick={optionClickCallback} boldText={value} options={optionsToShow} />
      }
    </div>
  );
}