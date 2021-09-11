import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../services/firebase';

const LabSession = (): React.FC => {
  const [labData, setLabData] = useState({});

  const fetchLabDetails = async (labSessionId) => {
    return new Promise((resolve, reject) => {
      db.ref(`/lab-sessions/${labSessionId}/details`).once(
        'value',
        (snapshot) => {
          resolve(snapshot.val());
        }
      );
    });
  };

  const history = useHistory();
  useEffect(() => {
    const labSessionId = localStorage.getItem('labSessionId');
    if (!labSessionId || labSessionId === 'null')
      return history.push('/lab-session');
    fetchLabDetails(labSessionId).then((data) => setLabData(data));
  });
  return <>{JSON.stringify(labData)}</>;
};

export default LabSession;
