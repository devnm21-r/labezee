import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'reactstrap/lib/Container';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { auth } from '../services/firebase';
import { signup } from '../services/api';

const Auth = ({ type }) => {
  const history = useHistory();
  const [viewType, setType] = useState(type || 'signup');
  const [alternateButton, setAlternateButton] = useState({
    label: 'Already have an account?',
    text: 'Sign in'
  });
  const [actionButtonText, setActionButtonText] = useState('Sign Up');

  const [inputValues, setInputValues] = useState({
    email: '', password: '', role: '', name: ''
  });
  const updateInputValue = (e) => setInputValues(prevState => ({
    ...prevState,
      [e.target.name]: e.target.value,
  }));


  const changeAuthType = () => {
    if (viewType === 'signin') {
      setType('signup');
      setActionButtonText('Sign Up')
      setAlternateButton({
        label: "Don't have an account?",
        text: 'Sign up',
      });
    } else {
      setType('signin');
      setActionButtonText('Sign in')
      setAlternateButton({
        label: 'Already have an account?',
        text: 'Sign in',
      });
    }
  };

  const signupHandler = async () => {
    if (viewType === 'signup') {
      const { data } = await signup(inputValues);
      auth().signInWithCustomToken(data.token);
      history.push('/');
    } else {
      const res = await auth().signInWithEmailAndPassword(inputValues.email, inputValues.password);
      history.push('/');
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(auth => {
      console.log('currently logged in user ', auth);
    });
  }, []);

  return (
    <>
      <Container style={{ padding: '20%' }}>
        <FormGroup style={{ display: viewType === 'signup' ? 'block': 'none' }} row>
          <Label for="exampleEmail" sm={12}>
            Name
          </Label>
          <Col sm={12}>
            <Input
              name="name"
              placeholder={'Batman'}
              onChange={updateInputValue}
            />
          </Col>
        </FormGroup>
        <FormGroup style={{ display: viewType === 'signup' ? 'block': 'none' }} row>
          <Label md={4}>
            Role
          </Label>
          <Col style={{ marginLeft: '20px' }} sm={10}>
            <Col>
            <Label>
              <Input
                type="radio"
                name="role"
                value={'teacher'}
                onChange={updateInputValue}

              />
              Teacher
            </Label>
            </Col>
            <Col>
              <Label>
                <Input
                  type="radio"
                  name="role"
                  value={'student'}
                  onChange={updateInputValue}

                />
                Student
              </Label>
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email
          </Label>
          <Col sm={12}>
            <Input
              type="email"
              name="email"
              onChange={updateInputValue}
              placeholder="you@suck.com"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Password
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="password"
              placeholder="super secret"
              onChange={updateInputValue}

            />
          </Col>
        </FormGroup>
        <Button onClick={signupHandler} block={true} color={'primary'} >
          {actionButtonText}
        </Button>
        <Row style={{ marginTop: '25px' }}>
          {alternateButton.label} <br />
          <Button onClick={changeAuthType} block={true} color={'link'} >
            {alternateButton.text}
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
