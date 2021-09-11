import React, { useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Button from 'reactstrap/lib/Button';
import NammaInput from '../../components/NammaInput';
import { useHistory } from 'react-router-dom';

const StudentMain = () => {
  const history = useHistory();
  const [labCode, setLabCode] = useState('');
  const joinSession = () => {
    localStorage.setItem('labSessionId', labCode);
    history.push('/lab-session');
  }
  return (
    <>
      <Container
        style={{ paddingTop: '15%', paddingLeft: '5%', paddingRight: '5%' }}
      >
        <h2>Join a lab session with code</h2>
        <NammaInput
          onChange={(e) => setLabCode(e.target.value)}
          type="text"
          label="Lab code"
          value={labCode}
        />
        <Button
          block
          size="lg"
          style={{ color: 'beige' }}
          color="primary"
          outline
          onClick={joinSession}
        >
          Join
        </Button>
      </Container>
    </>
  );
};

export default StudentMain;
