import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../registation/style.css';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Watch } from  'react-loader-spinner'

function Registation() {
  const auth = getAuth();
  const [firstname,setFirstName] = useState("")
  const [lastname,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [firstnameerr,setFirstNameerr] = useState("")
  const [lastnameerr,setLastNameerr] = useState("")
  const [emailerr,setEmailerr] = useState("")
  const [passworderr,setPassworderr] = useState("")
  const [passwordshow,setPasswordShow] = useState(false)
  const [success,setSuccess] = useState(false)
  const [loading,setLoading] = useState(false)

  let handleFirstName =(e)=>{
  setFirstName(e.target.value)
  setFirstNameerr("")
  }
  let handleLastName =(e)=>{
    setLastName(e.target.value)
    setLastNameerr("")
  }
  const handleEmail =(e)=>{
    setEmail(e.target.value)
    setEmailerr("")
  }
  let handlePassword =(e)=>{
    setPassword(e.target.value)
    setPassworderr("")
  }
  let handleSubmit =(e)=>{
      e.preventDefault()
     if(!firstname){
      setFirstNameerr("Fist name is requerd")
     }
     if(!lastname){
      setLastNameerr("last name is requerd")
     }
     if(!email){
      setEmailerr("email is requerd")
     }else{
     if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
      setEmailerr("valied email  requerd")
     }
     }
     if(!password){
      setPassworderr("password is requerd")
    }else{
      if(!/^(?=.*[a-z])/.test(password)){
        setPassworderr("Lowercase requerd")
      }else if(!/^(?=.*[A-Z])/.test(password)){
        setPassworderr("Upparcase requerd")
      }else if(!/^(?=.*[0-9])/.test(password)){
        setPassworderr("Number requerd")
      }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
        setPassworderr("Special character requerd")
      }else if(!/^(?=.{8,})/.test(password)){
        setPassworderr("The Password must be eight characters or longer")
      }
    }
    if(email && firstname && lastname && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password).then(()=>{
        // setSuccess("");
        toast.success("Registation Successfully. Please Verify Your email");
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        sendEmailVerification(auth.currentUser)
        setLoading(false)
      }).catch((error) => {
          const errorCode = error.code;
          setEmailerr(error.code)
          if(error.code.includes("auth/email-already-in-use")){
            setEmailerr("Email Already in use")
            setLoading(false)
          }
         });
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

    }
  }

  return (
    <div className='registation d-flex justify-content-center'>
              <ToastContainer position="bottom-right" theme="dark" />

        <div className="left mt-5 me-5">
          <img src="images/logo.png" alt="" />
          <p className='ms-5'>Facebook helps you connect and share <br />
             with the people in your life.</p>
        </div>
        <div className="right ">
          <form action=""  className='border p-3'>
            <input value={firstname} onChange={handleFirstName} type="text" placeholder='First Name' className='form-control mb-3' />
            { firstnameerr &&
            <div className="bg-danger  text-white p-2 mb-3 ">{firstnameerr}</div>
            }
            <input value={lastname} onChange={handleLastName} type="text" placeholder='Last Name' className='form-control mb-3' />
            {lastnameerr && 
            <div className="bg-danger  text-white p-2 mb-3 ">{lastnameerr}</div>
            }
            <input value={email} onChange={handleEmail} type="email" placeholder='Email Address' className='form-control mb-3' />
            {emailerr && 
            <div className="bg-danger  text-white p-2 mb-3 ">{emailerr}</div>
            }
            <div className="password-area">
            <input value={password} onChange={handlePassword} type={passwordshow ? "text" :"password"} placeholder='password' className='form-control mb-4' />
            {passwordshow ?(
              <AiOutlineEye onClick={()=>setPasswordShow(!passwordshow)} className='absolute'/>

            )
           :(
             <AiOutlineEyeInvisible className='absolute' onClick={()=>setPasswordShow(!passwordshow)} />
             ) 
             
            }
            </div>
            {passworderr && 
            <div className="bg-danger  text-white p-2 mb-3 ">{passworderr}</div>
            }
            {loading ?
            <div className=" d-flex justify-content-center">
              <Watch
              height="80"
              width="80"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
       
            </div>
               :
               <button onClick={handleSubmit}  className='btn btn-primary w-100 mb-3'>Sign Up</button>

          }
            <a className='text-center  d-block mb-3' href="">Forgotten password</a>
            <div className=" text-center">
            <button className='btn btn-info'> Already Have</button>

            </div>
          </form>

          { success &&
            <div className="alert mt-5 alert-success  p-2 mb-3 ">{success}</div>
            }
        </div>
    </div>
  )
}

export default Registation