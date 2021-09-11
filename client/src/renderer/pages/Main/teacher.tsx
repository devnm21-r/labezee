import React, { useEffect, useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Button from 'reactstrap/lib/Button';
import { db } from '../../services/firebase';
import Navbar from '../../components/Navbar';
import NewLabSessionModal from '../../components/NewLabSessionModal';
import { useHistory } from 'react-router-dom';

interface ProblemStatement {
  title: string;
  description: string;
}

const TeacherMain = () => {
  // @eslint-ignore @typescript-eslint/no-explicit-any
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleNewModal = () => setIsModalOpen((p) => !p);
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const createLabSession = async ({
    name,
    problemStatements,
    executionEnvironment,
  }: {
    name: string;
    problemStatements: ProblemStatement[];
    executionEnvironment: string;
  }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const labSessionId = `${new Date().getTime()}-${String(Math.random()).slice(
      2,
      8
    )}`;
    await db
      .ref(`/lab-sessions/${labSessionId}/details`)
      .set({ name, problemStatements, executionEnvironment });
    localStorage.setItem('labSessionId', labSessionId);
    history.push('/lab-session');
  };
  return (
    <>
      <Container style={{ margin: '3%' }}>
        <Button onClick={toggleNewModal} size="md" color="dark">
          Create New Lab Session
        </Button>
      </Container>
      <NewLabSessionModal
        isOpen={isModalOpen}
        toggle={toggleNewModal}
        onSubmit={(formData) => {
          createLabSession(formData);
        }}
      />
    </>
  );
};

export default TeacherMain;
