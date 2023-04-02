import React from 'react';
import {Link} from 'react-router-dom'

export const AuthQuestion = ({className, path ,linkText}:any) => { 

   const questionText =
     path === "/register"
       ? "Don't have an account yet?"
       : "Already have an account?";
   return (
     <div>
       <span className={className}>{questionText}</span>
       <Link style={{fontSize : '0.8em'}} to={path}>{linkText}</Link>
     </div>
   );
}