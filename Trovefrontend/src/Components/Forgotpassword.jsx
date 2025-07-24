import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import datasolvelogo from "../assets/datasolve.png";

const apiURL ='http://34.93.2.122:5000/';
// console.log("Api:",apiURL)

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    // Validate input fields
    if (!email || !newPassword || !confirmNewPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    setLoading(true);
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 10;
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 300);

    try {
      // Call your backend API using axios
      const response = await axios.post(`${apiURL}auth/forgotpassword`, {
        email,
        newpassword: newPassword,
        confirmnewpassword: confirmNewPassword,
        
      });

      // If the API call succeeds, show success toast and navigate to login
      clearInterval(progressInterval);
      setProgress(100);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      // Handle errors from the API or network issues
      clearInterval(progressInterval);
      setProgress(0);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 2000);
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={datasolvelogo}
                alt="datasolvelogo"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </div>
           
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                    Forgot Password 
                  </h5>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address <span className="required"> * </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="newPassword">
                      New Password <span className="required"> * </span>
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control form-control-lg"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmNewPassword">
                      Confirm New Password <span className="required"> * </span>
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      className="form-control form-control-lg"
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-dark btn-lg btn-block mt-4"
                      type="button"
                      onClick={handleUpdatePassword}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Update Password"}
                    </button>
                  </div>

                  {loading && (
                    <div className="progress mt-3" style={{ height: "25px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progress"
                        style={{ width: `${progress}%` }}
                      >
                        {progress}%
                      </div>
                    </div>
                  )}
                </form>
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
