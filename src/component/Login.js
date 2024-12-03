import React, { useState } from 'react'
import './Login.css'
import { Link,useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    // const auth = getAuth();
    const signIn = e => {
        e.preventDefault();

        //firbase login
        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log('User signed in:', auth);
                history.push('/')
                // Handle successful login here, e.g., redirect
            })
            .catch((error) => alert(error.message));

    }

    const register = e => {
        e.preventDefault();

        //firbase register
        createUserWithEmailAndPassword(auth,email,password).then((auth) =>{
            console.log(auth);
            if(auth){
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to='./'>
            <img className="login_logo" src="https://uploads.turbologo.com/uploads/design/preview_image/63465196/watermark_preview_image20240925-1-1mpfqqu.png" alt="" />
        </Link>
        <div className="login_container">
            <h1>Sign-In</h1>
            <form action="">
                <h5>E-mail</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                
                <button type='submit' onClick={signIn} className='login_signinbutton'>
                    Sign-In
                </button>
                </form>

                <p>
                    By signing-in you agree to HeritageHomes condition of Use & Sale. Please see our Privacy Notice, our cookies Notice andd our Interest-Based Ads
                </p>

                <button onClick={register} className='login_registerbutton'>
                    Create Your Account
                </button>
        </div>
    </div>
  )
}

export default Login