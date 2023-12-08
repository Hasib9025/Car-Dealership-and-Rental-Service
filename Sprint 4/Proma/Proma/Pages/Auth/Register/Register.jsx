import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const Register = () => {
    useEffect(() => {
        document.title = "EduKit | Register";
    },[])

    const {createUser, updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
      
        try {
          const result = await createUser(email, password);
          const createdUser = result.user;
      
          await updateUser(name, photo);
      
          const userData = {
            _id: createdUser.uid,
            name: createdUser.displayName,
            email: createdUser.email
          };
      
          const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (response.ok) {
            navigate(from, { replace: true });
            setError('');
          } else {
            setError('Error posting user data to the server');
          }
        } catch (error) {
          // Handle other errors
          console.error(error);
        }
      };

    return (
        <div className=" hero bg-base-200 py-24">
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <h1 className="text-4xl text-center pt-5 font-bold">Register now</h1>                
                <form onSubmit={handleRegister} className="card-body">
                {error && <p style={{ color: 'red', textAlign:'center'}}>{error}</p>}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered input-warning" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered input-warning" />
                    </div>
                    <div  className="form-control">
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
                    <button className="btn btn-warning">Register</button>
                    </div>
                    <div className="mt-5">
                        <p>Already have an account? <Link to="/login" className="link link-hover underline text-red-500">Login</Link></p>
 
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;