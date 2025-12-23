// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../components/common/Logo';
// import Footer from '../components/layout/Footer';
// import TermsModal from '../components/common/TermsModal';
// import PrivacyModal from '../components/common/PrivacyModal';
// import '../styles/AuthPage.css';

// const AuthPage = () => {
//   const navigate = useNavigate();
//   const [isActive, setIsActive] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [showPrivacyModal, setShowPrivacyModal] = useState(false);

//   // Login State
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//     remember: false
//   }); 
//   const [loginErrors, setLoginErrors] = useState({});
//   const [loginSuccess, setLoginSuccess] = useState('');

//   // SignUp State
//   const [signUpData, setSignUpData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     company: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });
//   const [signUpErrors, setSignUpErrors] = useState({});
//   const [signUpSuccess, setSignUpSuccess] = useState('');

//   // Forgot Password State
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [forgotErrors, setForgotErrors] = useState({});
//   const [forgotSuccess, setForgotSuccess] = useState('');

//   // Validate Email
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Handle Toggle with Wave Animation
//   const handleToggle = (targetState) => {
//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setIsActive(targetState);
//     }, 800); // نصف مدة الأنيميشن
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 1600); // مدة الأنيميشن الكاملة
//   };

//   // Handle Login Submit
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setLoginErrors({});
//     setLoginSuccess('');
    
//     const errors = {};

//     // Validation
//     if (!loginData.email) {
//       errors.email = 'Please fill out this field';
//     } else if (!validateEmail(loginData.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!loginData.password) {
//       errors.password = 'Please fill out this field';
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoginErrors(errors);
//       return;
//     }

//     // TODO: Replace with actual API call
//     console.log('Login:', loginData);
    
//     // Simulate API call
//     setTimeout(() => {
//       // Check credentials (this is just for demo - replace with real API)
//       if (loginData.email === 'test@test.com' && loginData.password === 'password') {
//         setLoginSuccess('Login successful! Redirecting to your dashboard…');
//         setTimeout(() => {
//           navigate('/dashboard'); // or wherever you want to redirect
//         }, 2000);
//       } else {
//         setLoginErrors({ general: 'Invalid email or password' });
//       }
//     }, 500);
//   };

//   // Handle SignUp Submit
//   const handleSignUpSubmit = (e) => {
//     e.preventDefault();
//     setSignUpErrors({});
//     setSignUpSuccess('');
    
//     const errors = {};

//     // Validation
//     if (!signUpData.firstName) {
//       errors.firstName = 'Please fill out this field';
//     }

//     if (!signUpData.lastName) {
//       errors.lastName = 'Please fill out this field';
//     }

//     if (!signUpData.email) {
//       errors.email = 'Please fill out this field';
//     } else if (!validateEmail(signUpData.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!signUpData.company) {
//       errors.company = 'Please fill out this field';
//     }

//     if (!signUpData.password) {
//       errors.password = 'Please fill out this field';
//     } else if (signUpData.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }

//     if (!signUpData.confirmPassword) {
//       errors.confirmPassword = 'Please fill out this field';
//     } else if (signUpData.password !== signUpData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     if (!signUpData.agreeToTerms) {
//       errors.agreeToTerms = 'You must agree to the Terms of Service';
//     }

//     if (Object.keys(errors).length > 0) {
//       setSignUpErrors(errors);
//       return;
//     }

//     // TODO: Replace with actual API call
//     console.log('Sign up:', signUpData);
    
//     // Simulate API call
//     setTimeout(() => {
//       setSignUpSuccess('Account created successfully! Redirecting to login…');
//       setTimeout(() => {
//         handleToggle(false); // Switch to login with animation
//         setSignUpSuccess('');
//         setSignUpData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           company: '',
//           password: '',
//           confirmPassword: '',
//           agreeToTerms: false
//         });
//       }, 2000);
//     }, 500);
//   };

//   // Handle Forgot Password Submit
//   const handleForgotPasswordSubmit = (e) => {
//     e.preventDefault();
//     setForgotErrors({});
//     setForgotSuccess('');

//     const errors = {};

//     if (!forgotEmail) {
//       errors.email = 'Please fill out this field';
//     } else if (!validateEmail(forgotEmail)) {
//       errors.email = 'Invalid email address';
//     }

//     if (Object.keys(errors).length > 0) {
//       setForgotErrors(errors);
//       return;
//     }

//     // TODO: Replace with actual API call
//     console.log('Forgot password email:', forgotEmail);
    
//     // Simulate API call
//     setTimeout(() => {
//       setForgotSuccess('Password reset link sent! Check your email.');
//       setTimeout(() => {
//         setShowForgotPassword(false);
//         setForgotEmail('');
//         setForgotSuccess('');
//       }, 3000);
//     }, 500);
//   };

//   // Handle Google Login
//   const handleGoogleLogin = () => {
//     console.log('Google login clicked');
//     // TODO: Add your Google OAuth logic here
//   };

//   // Show Forgot Password Form
//   const showForgotPasswordForm = () => {
//     setShowForgotPassword(true);
//     setLoginErrors({});
//     setLoginSuccess('');
//   };

//   // Back to Login
//   const backToLogin = () => {
//     setShowForgotPassword(false);
//     setForgotErrors({});
//     setForgotSuccess('');
//     setForgotEmail('');
//   };

//   return (
//     <div className="auth-page">
//       {/* Header */}
//       <header>
//         <div className="container">
//           <Logo />
//         </div>
//       </header>

//       {/* Main Auth Container */}
//       <div className="auth-main">
//         <div className={`auth-container ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
          
//           {/* Sign In Form */}
//           <div className="form-container sign-in-container">
//             <div className="auth-form">
//               {!showForgotPassword ? (
//                 <>
//                   <h1>Log In</h1>
                  
//                   {loginErrors.general && (
//                     <div className="error-message general-error">
//                       {loginErrors.general}
//                     </div>
//                   )}

//                   {loginSuccess && (
//                     <div className="success-message">
//                       {loginSuccess}
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleLoginSubmit}>
//                     <div className="form-group">
//                       <label>Email Address</label>
//                       <input
//                         type="email"
//                         value={loginData.email}
//                         onChange={(e) => setLoginData({...loginData, email: e.target.value})}
//                         className={loginErrors.email ? 'error' : ''}
//                       />
//                       {loginErrors.email && (
//                         <span className="error-text">{loginErrors.email}</span>
//                       )}
//                     </div>
                    
//                     <div className="form-group">
//                       <label>Password</label>
//                       <input
//                         type="password"
//                         value={loginData.password}
//                         onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//                         className={loginErrors.password ? 'error' : ''}
//                       />
//                       {loginErrors.password && (
//                         <span className="error-text">{loginErrors.password}</span>
//                       )}
//                     </div>
                    
//                     <div className="checkbox-group">
//                       <label>
//                         <input
//                           type="checkbox"
//                           checked={loginData.remember}
//                           onChange={(e) => setLoginData({...loginData, remember: e.target.checked})}
//                         />
//                         Remember me
//                       </label>
//                       <button 
//                         type="button" 
//                         className="forgot-password"
//                         onClick={showForgotPasswordForm}
//                       >
//                         Forgot Password?
//                       </button>
//                     </div>
                    
//                     <button type="submit" className="auth-btn">
//                       Log In
//                     </button>
//                   </form>
                  
//                   <button onClick={handleGoogleLogin} className="google-btn">
//                     <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
//                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                     </svg>
//                     Log in with Google
//                   </button>
                  
//                   <div className="switch-text">
//                     <button onClick={() => handleToggle(true)}>
//                       Don't have an account yet? Sign Up
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h1>Forgot Your Password?</h1>
//                   <p className="forgot-subtitle">
//                     No problem. Enter the email address associated with your account, 
//                     and we'll send you a link to reset your password.
//                   </p>

//                   {forgotSuccess && (
//                     <div className="success-message">
//                       {forgotSuccess}
//                     </div>
//                   )}

//                   <form onSubmit={handleForgotPasswordSubmit}>
//                     <div className="form-group">
//                       <label>Email Address</label>
//                       <input
//                         type="email"
//                         value={forgotEmail}
//                         onChange={(e) => setForgotEmail(e.target.value)}
//                         className={forgotErrors.email ? 'error' : ''}
//                       />
//                       {forgotErrors.email && (
//                         <span className="error-text">{forgotErrors.email}</span>
//                       )}
//                     </div>

//                     <button type="submit" className="auth-btn">
//                       Send Reset Link
//                     </button>
//                   </form>

//                   <div className="switch-text">
//                     <button onClick={backToLogin}>
//                       Back to Log In
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Sign Up Form */}
//           <div className="form-container sign-up-container">
//             <div className="auth-form">
//               <h1>Sign Up</h1>

//               {signUpErrors.general && (
//                 <div className="error-message general-error">
//                   {signUpErrors.general}
//                 </div>
//               )}

//               {signUpSuccess && (
//                 <div className="success-message">
//                   {signUpSuccess}
//                 </div>
//               )}
              
//               <form onSubmit={handleSignUpSubmit}>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>First Name</label>
//                     <input
//                       type="text"
//                       value={signUpData.firstName}
//                       onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
//                       className={signUpErrors.firstName ? 'error' : ''}
//                     />
//                     {signUpErrors.firstName && (
//                       <span className="error-text">{signUpErrors.firstName}</span>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Last Name</label>
//                     <input
//                       type="text"
//                       value={signUpData.lastName}
//                       onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
//                       className={signUpErrors.lastName ? 'error' : ''}
//                     />
//                     {signUpErrors.lastName && (
//                       <span className="error-text">{signUpErrors.lastName}</span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={signUpData.email}
//                     onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
//                     className={signUpErrors.email ? 'error' : ''}
//                   />
//                   {signUpErrors.email && (
//                     <span className="error-text">{signUpErrors.email}</span>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label>Company Name</label>
//                   <input
//                     type="text"
//                     value={signUpData.company}
//                     onChange={(e) => setSignUpData({...signUpData, company: e.target.value})}
//                     className={signUpErrors.company ? 'error' : ''}
//                   />
//                   {signUpErrors.company && (
//                     <span className="error-text">{signUpErrors.company}</span>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     value={signUpData.password}
//                     onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
//                     className={signUpErrors.password ? 'error' : ''}
//                   />
//                   {signUpErrors.password && (
//                     <span className="error-text">{signUpErrors.password}</span>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label>Confirm Password</label>
//                   <input
//                     type="password"
//                     value={signUpData.confirmPassword}
//                     onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
//                     className={signUpErrors.confirmPassword ? 'error' : ''}
//                   />
//                   {signUpErrors.confirmPassword && (
//                     <span className="error-text">{signUpErrors.confirmPassword}</span>
//                   )}
//                 </div>
                
//                 <div className="terms-group">
//                   <input
//                     type="checkbox"
//                     checked={signUpData.agreeToTerms}
//                     onChange={(e) => setSignUpData({...signUpData, agreeToTerms: e.target.checked})}
//                   />
//                   <label>
//                     By signing up, you agree to our{' '}
//                     <a href="#">Terms of Service</a> and{' '}
//                     <a href="#">Privacy Policy</a>
//                   </label>
//                 </div>
//                 {signUpErrors.agreeToTerms && (
//                   <span className="error-text">{signUpErrors.agreeToTerms}</span>
//                 )}
                
//                 <button type="submit" className="auth-btn">
//                   Sign Up
//                 </button>
//               </form>
              
//               <button onClick={handleGoogleLogin} className="google-btn">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 Log in with Google
//               </button>
              
//               <div className="switch-text">
//                 <button onClick={() => handleToggle(false)}>
//                   Already have an account?
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Toggle Panel */}
//           <div className="toggle-container">
//             <div className="toggle">
//               <div className="toggle-panel toggle-left">
//                 <h2>Welcome Back!</h2>
//                 <p>Enter your credentials to access your AI assistant dashboard</p>
//                 <button className="toggle-btn" onClick={() => handleToggle(false)}>
//                   Log In
//                 </button>
//               </div>
              
//               <div className="toggle-panel toggle-right">
//                 <h2>Hello, Friend!</h2>
//                 <p>Create your account and start building intelligent chatbots in minutes</p>
//                 <button className="toggle-btn" onClick={() => handleToggle(true)}>
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AuthPage;