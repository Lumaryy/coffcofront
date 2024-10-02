import React from 'react';
import './App.css';
import DataComponent from './components/DataComponent';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, loading, login, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1>Welcome!</h1>
          <button onClick={logout}>Logout</button>
          <DataComponent />
        </>
      ) : (
        <>
          <h1>Please log in</h1>
          <button onClick={() => login('example-token')}>Login</button>
        </>
      )}
    </div>
  );
};

export default App;
