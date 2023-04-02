import { useState, useRef, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../UI/MyButton'
import { AuthQuestion } from '../UI/AuthQuestion'
import { AuthServer } from '../../api/authCLient';
import { Spinner } from '../UI/Spinner/Spinner';
import { alertModal } from '../../utils/auth';
import cl from './AuthPage.module.css'


export const AuthPage = ({type}:{type :'login' | 'register'}) => {

   const [spinner,setSpinner] = useState(false);
   const userNameRef = useRef() as MutableRefObject<HTMLInputElement>
   const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
   const navigate = useNavigate()

   const handleAuthRes = (
      res : boolean | undefined,
      path : string,
      modalText : string,
      modalStatus : string
   ) => {
      if(!res){
         setSpinner(false)
         return;
      }
      setSpinner(false)
      navigate(path)
     alertModal({modalText : modalText , modalStatus: modalStatus})
   }

   const  handleLogin = async (userName : string, password : string)  => {
      if(!userName || !password) {
          setSpinner(false)
           alertModal({modalText: 'Please fill in all the fields',modalStatus :'warning'})
          return;
      }
      const res = await AuthServer.login(userName ,password);
      
      handleAuthRes(res , '/costs', 'Success Login', 'success')
   }
   
   const  handleRegister = async (userName : string, password : string) => {
      if(!userName|| !password) {
         setSpinner(false) 
        alertModal({modalText: 'Please fill in all the fields',modalStatus :'warning'})
         return;
      }
      if(password.length < 5) {
            setSpinner(false) 
           alertModal({modalText: 'Password must be at least 5 characters',modalStatus :'warning'})
            return
   };

      const res = await AuthServer.register(userName ,password);
      
       handleAuthRes(res , '/login', 'Success registretion', 'success')
   }
   
   const handleLogOrReg = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSpinner(true)

      switch(type) {
         case 'login':
            handleLogin(
               userNameRef.current.value,
               passwordRef.current.value
               )
               break;
         case 'register':
            handleRegister(
               userNameRef.current.value,
               passwordRef.current.value
               )
               break;
         default:
            return console.log('Someshing wrong with authorization');
      }
   }

   const currentTitle = 
   type === 'login' ? 'Log in' : 'Registration';

   return (
      <div className='container'>
         <h1>{currentTitle}</h1>
         
         {
            spinner 
            ? <Spinner/>
            :
            <form 
         className='form-group'
         onSubmit={handleLogOrReg}
         >
            <label  className={cl.auth_label}>
               Name 
               <input 
               ref={userNameRef}
               type="text" 
               placeholder="Enter your Name" />
            </label>
            
            
            <label htmlFor="password"
            className={cl.auth_label}
            >
            Password
             <input 
             ref={passwordRef}
               type="password" 
               placeholder="Enter your password" 
               />
            </label>
           

            <MyButton className={`btn btn-primary ${cl.auth_btn}`}>
               { currentTitle}
            </MyButton>
         </form>
         }
         
         {
            type === 'login'
            ? <AuthQuestion 
            className={cl.auth_q}
            path = {'/register'}
            linkText = 'Click for register'
            ></AuthQuestion>
            : <AuthQuestion 
            className={cl.auth_q}
            path = {'/login'}
            linkText = 'Click for login'
            ></AuthQuestion>
         }
      </div>
   )
}