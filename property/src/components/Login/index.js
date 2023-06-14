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
  const [errorMsg, setErrorMsg] = useState(null)



  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === 'admin') {
      axios.post('http://localhost:1111/admin/login', {
        username: email,
        password,
      }).then((response) => {
        const { token, type } = response.data;
        const jwtJson = JSON.stringify({ type, token });
        localStorage.setItem('token', jwtJson);
        navigate('/admin');
      }).catch((err) => {
        const errmsg = err.response?.data?.error;
        setErrorMsg(errmsg);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      });
    } else if (userType === 'supplier') {
      await axios.post('http://localhost:1111/suppliers/login', {
        email,
        password,
      }).then((response) => {
        const { token, type } = response.data;
        const jwtJson = JSON.stringify({ type, token });
        localStorage.setItem('token', jwtJson);
        navigate('/supplier');
      }).catch((err) => {
        const errmsg = err.response?.data?.error;
        setErrorMsg(errmsg);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      });
    }
  };
  return (
    <div className='imgBg'>
      <div className='colorBg'>
        <div className='login'>
          <h2>ALIZAI BUILDER<sup>&reg;</sup></h2>
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
              <p>{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
