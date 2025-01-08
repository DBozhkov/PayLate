import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Footer } from './NavbarFooter/Footer';
import { HomePage } from './HomePage/HomePage';
import { Navbar } from './NavbarFooter/Navbar';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import { oktaConfig } from './lib/oktaConfig';
import LoginWidget from './Auth/LoginWidget';
import { AboutUs } from './Info/AboutUs';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate('/login');
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    const relativeUrl = toRelativeUrl(originalUri || '/', window.location.origin);

    navigate(relativeUrl, { replace: true });
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
          <Route path='/login/callback' Component={LoginCallback} />
        </Routes>
      </div>
      <Footer />
    </Security>
    </div>
  );
}

