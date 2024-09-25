import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../contexts/AuthContext';

interface LoginResponse {
  success: boolean;
  message: string;
  username: string;
  isAdmin: boolean;
}

interface Props {
  setIsAuthenticated: (value: any) => void;
  setIsAdmin: (value: any) => void;
}

const LoginPage: React.FC<Props> = () => {
  const [passkey, setPasskey] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsAdmin, setUserName } = useAuth();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!passkey) {
      setLoginMessage('Passkey is required');
      return;
    }

    try {
      const response = await axios.post<LoginResponse>('http://localhost:5000/api/login', {
        passkey,
      });

      console.log(response.data)
      if (response.data.success) {
        setLoginMessage(`Welcome, ${response.data.username}.`);

        localStorage.setItem('username', response.data.username);
        localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
        setUserName(response.data.username);
        setIsAdmin(response.data.isAdmin)
        setIsAuthenticated(true);

        navigate('/manage-urls');
      } else {
        setLoginMessage(response.data.message || 'Login failed');
      }

    } catch (error) {
      setLoginMessage('Wrong Passkey');
      console.error('Error details:', error);
    }
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <h1 className='login_title'>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="login_input"
            type="password"
            placeholder="Enter your passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
          />
          <button className='login_button' type="submit">Login</button>
        </form>
        {loginMessage && <p className="login-message">{loginMessage}</p>}

        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon1" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon2" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon3" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon4" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon5" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon6" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon7" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon8" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon9" />
        <img src="https://static-00.iconduck.com/assets.00/cloudflare-icon-2048x927-9dhn82y4.png" alt="cloudflare icon" className="cloudflare-icon icon10" />
      </div>
    </div>
  );
};

export default LoginPage;
