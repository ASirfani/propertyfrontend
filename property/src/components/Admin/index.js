import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';
import jwt_decode from "jwt-decode";

import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
  const navigate = useNavigate()
  const [username,setUserName] = useState('');

  const check = async (id, name) => {
    await axios.post('http://localhost:1111/admin/check', { id, name }).then(response => {
      const data = response.data;
      console.log(data);
      if (!data.success) {
        navigate('/*')
      }
    })
      .catch(error => {
        console.log('Error:', error);
      });

  }

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      navigate('/login');
      return;
    } else {
      const decodedToken = jwt_decode(tokenString);
      setUserName(decodedToken.name)
      check(decodedToken.id, decodedToken.name);
    }
  })
  return (
    <div className="admin">
      <header>
        <Navigation name={username} />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <div>
          <p></p>
        </div>
      </footer>

    </div>
  );
};

export default AdminLayout;

