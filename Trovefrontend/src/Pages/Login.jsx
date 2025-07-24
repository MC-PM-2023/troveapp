import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import analyticslogo from '../assets/datasolve.png';
import trovegif from '../assets/Trove.gif';
import connectingdots from '../assets/connectingdots.jpg'; // Use the same image as the Signup page
import '../css/signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// const apiURL ='http://34.93.2.122:5000/';
const apiURL=import.meta.env.VITE_BACKENDAPIURL;
// const apiURL="http://localhost:5000/"
// const apiURL="http://34.93.84.198:5000/"
//console.log("Api:",apiURL)

export default function Login() {
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onchangefunction = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const validateform = () => {
    const domainemailregex = /@datasolve-analytics\.com$/;
    if (!formdata.email) {
      toast.error('Email is Required!');
      return false;
    }
    if (!domainemailregex.test(formdata.email)) {
      toast.error('Email address is not valid!');
      return false;
    }
    if (!formdata.password) {
      toast.error('Password is Required!');
      return false;
    }
    if (formdata.password.length < 6) {
      toast.error('Password must contain at least 6 characters');
      return false;
    }
    return true;
  };

  //   e.preventDefault();
  //   if (validateform()) {
  //     setLoading(true);
  //     setProgress(30);
  //     try {
  //       const response = await axios.post('http://localhost:5000/auth/login', formdata, {
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           setProgress(percentCompleted);
  //         },
  //       });

  //       setProgress(100);
  //       setLoading(false);
  //       toast.success(response.data.message);
  //       setTimeout(() => navigate('/landingpage'), 1000);
  //     } catch (error) {
  //       setLoading(false);
  //       setProgress(0);
  //       toast.error(error.response?.data.message || 'An error occurred. Please try again.');
  //     } finally {
  //       setTimeout(() => {
  //         setProgress(0);
  //         setLoading(false);
  //       }, 2000);
  //     }
  //   }
  // };
  // const handlelogin = async (e) => {
  //   e.preventDefault();
  //   if (validateform()) {
  //     setLoading(true);
  //     let currentProgress = 0;
  
  //     // Gradually increase progress
  //     const progressInterval = setInterval(() => {
  //       currentProgress += 10; // Increment progress by 10%
  //       setProgress((prev) => Math.min(prev + 10, 90)); // Cap progress at 90% until the API responds
  //     }, 300); // Update every 300ms
  
  //     try {
  //       const response = await axios.post('http://localhost:5000/auth/login', formdata);
  
  //       // When API call is done, set progress to 100% and stop the interval
  //       clearInterval(progressInterval);
  //       setProgress(100);
  
  //       toast.success(response.data.message);
  //       setTimeout(() => {
  //         navigate('/landingpage');
  //       }, 1000);
  //     } catch (error) {
  //       // Stop progress and reset on error
  //       clearInterval(progressInterval);
  //       setProgress(0);
  //       toast.error(error.response?.data.message || 'An error occurred. Please try again.');
  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //         setProgress(0);
  //       }, 2000); // Reset the progress bar after 2 seconds
  //     }
  //   }
  // };
//   const handlelogin = async (e) => {
//   e.preventDefault();
//   if (validateform()) {
//     setLoading(true);
//     let currentProgress = 0;

//     const progressInterval = setInterval(() => {
//       currentProgress += 10;
//       setProgress((prev) => Math.min(prev + 10, 90));
//     }, 300);

//     try {
//       const response = await axios.post(`${apiURL}auth/login`, formdata);

//       console.log("Login response value: ", response.data); // Check if the response structure is correct

      
//       console.log("auth_token:",response.data.token)
//       console.log("username:",response.data.username)

//       clearInterval(progressInterval);
//       setProgress(100);

//       toast.success(response.data.message);
//       setTimeout(() => {
//         navigate('/landingpage');
//       }, 1000);
//     } catch (error) {
//       clearInterval(progressInterval);
//       setProgress(0);
//       toast.error(error.response?.data.message || 'An error occurred. Please try again.');
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//         setProgress(0);
//       }, 2000);
//     }
//   }
// };


const handlelogin = async (e) => {
  e.preventDefault();
  if (validateform()) {
    setLoading(true);
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 10;
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 300);

    try {
      const response = await axios.post(`${apiURL}auth/login`, formdata);

     // console.log("Login response value: ", response.data);

      // ✅ Check if the response contains the expected data
      if (response.data && response.data.token && response.data.username) {
        // Store token and username
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('username', response.data.username);

        clearInterval(progressInterval);
        setProgress(100);

        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/landingpage');
        }, 1000);
      } else {
        // ❌ Show error for invalid login response
        clearInterval(progressInterval);
        setProgress(0);
        toast.error("Invalid login response from the server. Please try again.");
      }
    } catch (error) {
      // 🔥 Handle API errors (e.g., wrong email/password)
      clearInterval(progressInterval);
      setProgress(0);
      toast.error(error.response?.data.message || 'An error occurred. Please try again.');
    } finally {
      // Reset progress and loading
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 2000);
    }
  }
};

  
  
  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src={connectingdots}
                  alt="loginimg"
                  className="img-fluid"
                  style={{ borderradius: '1rem 0 0 1rem', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <span className="h1 fw-bold mb-0">
                        <img src={analyticslogo} style={{ height: 60 }} />
                        {/* <img src={trovegif} alt="" style={{ height: 60, margin: 10 }} /> */}
                      </span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                      Sign into your account
                    </h5>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email address <span className="required"> * </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email address"
                        name="email"
                        value={formdata.email}
                        onChange={onchangefunction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password <span className="required"> * </span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        name="password"
                        value={formdata.password}
                        onChange={onchangefunction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="button"
                        onClick={handlelogin}
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Login'}
                      </button>
                      <Link className="small text-muted m-3" to="/forgotpassword">Forgot password?</Link>
                    </div>

                   
                      
                    <p className="mb-5 pb-lg-2 text-muted">
                      Don’t have an account?{' '}
                      <Link to="/" className=' text-muted ' >
                        Sign up here
                      </Link>
                    </p>
                  
                  </form>

                  {loading && (
                    <div className="progress mt-3" style={{ height: '25px' }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progress"
                        style={{ width: `${progress}%` }}
                      >
                        {progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
