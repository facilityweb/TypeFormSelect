import React, { useState } from 'react';
import './index.css';

const clearInputStyle = {
  borderColor: 'rgb(1, 66, 172)',
  transitionDuration: '0.1s',
  transitionProperty: 'border-color',
  transitionTimingFunction: 'ease-out',
  borderRadius: '4px',
  padding: 2,
  cursor: 'pointer'
}
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
};

const Option = ({ optionValue, boldText, onClick }) => {
  let value = optionValue.value;
  let valueCmp;
  const hasBoldText = boldText && optionValue.value.indexOf(boldText) !== -1;
  if (hasBoldText) {
    const valueSplitted = value.split(boldText);
    valueCmp = (
      <>
        <span>{valueSplitted[0]}</span>
        &nbsp;<strong> {boldText} </strong>&nbsp;
        <span>{valueSplitted.slice(1, valueSplitted.length).reduce((a, b) => a + b)}</span>
      </>
    );
  }
  const [backgroundColor, setBrackgroundColor] = useState('rgb(230, 236, 247)');
  const changeBackgroundWithDelay = (newColors) => {
    setTimeout(() => {
      setBrackgroundColor(newColors[0]);
      if (newColors.length > 1) {
        changeBackgroundWithDelay([...newColors].slice(1, newColors.length));
      }
    }, 200);
  }
  const onClickCallback = () => {
    changeBackgroundWithDelay(['rgb(230, 236, 247)', 'white', 'rgb(230, 236, 247)', 'white', 'rgb(230, 236, 247)']);
    onClick(optionValue);
  };

  return (
    <label onClick={onClickCallback} style={{ ...optionDivStyle, backgroundColor }} key={optionValue.key}>{valueCmp || value}</label>
  );
}

const OptionsDiv = ({ options, boldText, onClick }) => (
  <div className="fade-in">
    {options.map(o => <Option optionValue={o} boldText={boldText} onClick={onClick} />)}
  </div>
);


const CloseSVG = () => <svg height="16" width="16"><path fill="rgb(1, 66, 172)" d="M8 6.586l6-6L15.414 2l-6 6 6 6L14 15.414l-6-6-6 6L.586 14l6-6-6-6L2 .586l6 6z"></path></svg>;

export default ({ placeholder, options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState();
  const optionsToShow = !value ? options : options.filter(o => o.value.toUpperCase().indexOf(value.toUpperCase()) !== -1);

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

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <input onChange={inputChangeCallback} value={value} onClick={() => setShowOptions(!showOptions)} placeholder={placeholder} style={selectStyle} />
        <div style={clearInputStyle} onClick={() => setValue('')}><CloseSVG /></div>
      </div>
      {
        (!showOptions && !value) ? null : <OptionsDiv onClick={optionClickCallback} boldText={value} options={optionsToShow} />
      }
    </div>
  );
}