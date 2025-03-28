import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";

function Register({closeModal}) {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[confirmPassword,setConfirmPassword] = useState('');
  const[error,setError] = useState('');

  const navigate = useNavigate();


  const handleSignUp = async ()=>{
    if(!email || !password || !confirmPassword ){
      setError('All feilds are required');
      return;
    }
    if(password!==confirmPassword){
      setError('Password do not match');
      return;
    }

    const userData = {
      email,
      password,
      confirmPassword
    }
    try{
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if(response.ok){
        alert('Sign Up successfull');
        setError('');
      
      //reset form feilds
      setEmail('');
      setPassword('');
      setConfirmPassword('');
        navigate("/login");
      return true;
      }else{
        const data = await response.json();
        setError(data.msg|| 'Failed to register.Please try again');
        return false;
      }
    }catch(error){
      setError('An error occured during sign up.Please try again later');
      console.log(error);
    }
  }
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
              Sign up with your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account? 
              <Link to="/login" className="sign-up" onClick={closeModal}>Sign in</Link>
            </p>
            <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      name="email"
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
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <br></br>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Confirm Password
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      name = "confirmPassword"
                      placeholder="confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  {error && <span className="login-error">{error}</span>}
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="submit"
                    onClick={handleSignUp}
                  >
                    Sign up
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

export default Register;
