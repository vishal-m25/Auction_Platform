import React, { useState }from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function Login({closeModal}) {
  
const navigate = useNavigate();
  const[email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const[error,setError] = useState('');
  
  const handleLogInClick = async()=>{
    if(!email || !password){
      setError('All Feilds are required');
      return;
    }
    const loginData = {email,password};

    try{
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const responseData = await response.json();
      if(response.ok){
        alert('Login Sucessfully!');
        localStorage.setItem("token", responseData.token);
        closeModal();
        setError('');
        navigate('/buy');
      }else{
        setError(responseData.msg||'Invalid email or password');
        return false;
      }
    }catch(error){
      setError('An Error occured during login.Please try again later');
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <section>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
          <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center"></div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?
              <Link to="/register" className="sign-up" onClick={closeModal}>
                Create a free account
              </Link>
            </p>
            <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  {error && <span className="login-error">{error}</span>}
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="button"
                    onClick={handleLogInClick}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </form>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
