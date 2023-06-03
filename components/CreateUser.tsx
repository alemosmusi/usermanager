import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

type CreateUserProps = {};

const CreateUser: React.FC<CreateUserProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { auth } = useAuth();

  const handleCreateUser = async () => {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el nombre y el teléfono en la base de datos
      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        displayName: displayName,
        phoneNumber: phoneNumber
      });

      // Restablecer los campos del formulario
      setEmail('');
      setPassword('');
      setDisplayName('');
      setPhoneNumber('');
      setError('');
    } catch (error) {
      setError('Failed to create user');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Display Name:</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;