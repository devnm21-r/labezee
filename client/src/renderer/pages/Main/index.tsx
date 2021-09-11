import React, { useEffect, useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Button from 'reactstrap/lib/Button';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import Navbar from '../../components/Navbar';
import TeacherMain from './teacher';
import StudentMain from './student';
import NewLabSessionModal from '../components/NewLabSessionModal';

interface ProbemStatement {
  title: string;
  description: string;
}

const Main = () => {
  const history = useHistory();
  // @eslint-ignore @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({ claims: { teacher: false } });

  useEffect(() => {
    auth().onAuthStateChanged((loggedInUser) => {
      if (!loggedInUser) {
        history.push('/auth');
      } else {
        auth()
          .currentUser.getIdTokenResult()
          .then((iDtokenResult) => {
            setUser({
              ...loggedInUser,
              teacher: iDtokenResult?.claims?.teacher,
            });
          });
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      {user.teacher ? <TeacherMain /> : <StudentMain />}
    </>
  );
};

export default Main;
