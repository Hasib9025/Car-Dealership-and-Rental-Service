import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Provider/AuthProvider';

const Login = () => {


    const {signIn, googleSignIn, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
      
        try {
          setLoading(true);
          const result = await signIn(email, password);
          const loggedUser = result.user;
          
          const response = await fetch(`http://localhost:5000/users/${loggedUser.uid}`);
          
          if (response.ok) {
            const userData = await response.json();
            
            const userRole = userData.role || 'default';
      
            localStorage.setItem('userRole', userRole);
          }
      
          navigate(from, { replace: true });
          setError('');
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Invalid email or password');
          setLoading(false);
        }
      };
      

    const handleGoogleSignIn = () =>{
        //event.preventDefault();
        googleSignIn()
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, {replace : true})
            setError('');
        })
        .catch(error =>{
            console.log(error);
        })
    }


    return (
        <div className=" hero bg-base-200 py-24">
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <h1 className="text-4xl text-center pt-5 font-bold">Login now</h1>                
                <form onSubmit={handleLogin} className="card-body">
                {error && <p style={{ color: 'red', textAlign:'center' }}>{error}</p>}
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered input-warning"/>
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered input-warning" />
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-warning">Login</button>
                    </div>
                    <div className="mt-5">
                        <p>Don&apos;t have a account? <Link to="/register" className="link link-hover underline text-red-500">Register</Link></p>
                        {/* <span>or</span><br />
                        <div className="flex justify-between mt-3">
                            <button onClick={handleGoogleSignIn} className="btn p-3">Login With Google</button>
                        </div> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;