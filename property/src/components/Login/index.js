import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);




  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === 'admin') {
      try {
        const response = await axios.post('http://localhost:1111/admin/login', {
          username:email,
          password,
        });
        if (response.data.message === 'Login successful') {
          navigate('/admin');
        } else {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);
    
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    } else if (userType === 'supplier') {
      try {
        const response = await axios.post('http://localhost:1111/suppliers/login', {
          email,
          password,
        });
        if (response.data.message === 'Login successful') {
          navigate('/supplier');
        } else {
          setShowAlert(true);
          // Hide the alert after 2 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);
    
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }
  };
  return (
    <div className='imgBg'>
      <div className='colorBg'>
        <div className='login'>
          <h2>Alpha PMS</h2>
          <form method='Post' onSubmit={handleSubmit}>
            <input
              type='text'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@gmail.com'
            />
            <input
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='*********'
            />
            <div className='option-user'>
              <div>
                <label htmlFor='admin'>
                  Admin
                </label>
                <input
                  type="radio"
                  value="admin"
                  name='admin'
                  checked={userType === 'admin'}
                  onChange={handleUserTypeChange}
                />

              </div>
              <div>
                <label htmlFor='supplier'>
                  Supplier
                </label>
                <input
                  type="radio"
                  value="supplier"
                  checked={userType === 'supplier'}
                  onChange={handleUserTypeChange}
                />
              </div>
            </div>

            <button className='loginbtn' type='submit'>Login</button>
          </form>
          
          {showAlert && (
            <div className="alertMsg">
              <p>Invalid credentials</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
