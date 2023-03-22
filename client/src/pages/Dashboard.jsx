import { useState, useEffect } from 'react';

function Dashboard(props) {
  const [user, setUser] = useState('');

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://${props.hostname}:${props.port}/dashboard/`,
        {
          method: 'GET',
          headers: {
            token: localStorage.token,
          },
        },
      );

      const parsedRes = await response.json();
      setUser(parsedRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      props.setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="">
      <h1>{user.userName}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={(e) => logout(e)}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
