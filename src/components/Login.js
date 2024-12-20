import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


function Login() {
  const location = useLocation(); // To get the query parameters
  const navigate = useNavigate(); // To navigate to /file-upload

  const handleLogin = () => {
    // Redirect to the backend's Google authentication route
    window.location.href = 'http://localhost:5000/auth/google';
  };

  useEffect(() => {
    // Extract accessToken and refreshToken from URL query params
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // Store tokens in localStorage for future use
      localStorage.setItem('google_access_token', accessToken);
      localStorage.setItem('google_refresh_token', refreshToken);

      // Clear the query parameters from the URL after extraction
      navigate('/file-upload', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Login to Continue</h2>
      <Button onClick={handleLogin}>Login with Google</Button>
    </div>
  );
}

export default Login;
