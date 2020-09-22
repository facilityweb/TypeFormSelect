import React, { useState } from 'react';
import Lookup from './Lookup';

const containerPositionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '40vh'
}

const Container = ({ children }) => (
  <div style={containerPositionStyle}>
    {children}
  </div>
);
const Label = ({ children }) => (
  <label style={{
    fontSize: '24px',
    lineHeight: '32px'
  }}>
    {children}
  </label>
);

const QuestionNumber = ({ n }) => (
  <>
    <span style={{ color: 'rgb(1, 66, 172)', fontSize: '14px' }}>{n} </span>
    <svg height="10" width="11"><path fill="rgb(1, 66, 172)" d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path fill="rgb(1, 66, 172)" d="M8 4v2H0V4z"></path></svg>
  </>
);

function App() {
  const selectOptions = [{ key: '1', value: 'resposta 1' }, { key: '2', value: 'resposta 2' }];

  return (
    <div style={{ width: '100%', display: 'flex', height: '100vh', justifyContent: 'center' }}>
      <Container>
        <Label><QuestionNumber n={1} /> Pergunta do formulário 1</Label>

        <Lookup options={selectOptions} placeholder='Escreve ou seleciona uma opção' />
        {/* <div>
        <div>
          <label>0 de 3 respondidas </label>
          <ProgressBar></ProgressBar>
        </div>
        <Cima /> <Baixo />
      </div> */}

      </Container>
    </div>
  );
}

export default App;
