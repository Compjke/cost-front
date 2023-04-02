import { logIn, setUser } from '../context/auth'
import { axiosError } from '../utils/errors';
import api from './axiosConfig'

export class AuthServer {

   static async login(userName: string , password :string) {
      try {
         const res = await  api.post('/auth/login', {
            userName,
            password
         });
   

         if(res.status === 200){
            logIn(true)
            setUser(res.data.userName)
            localStorage.setItem('auth',JSON.stringify(res.data))
            return true;
         }

         return false;
      } catch (err) {
                axiosError(err);
      }
   }
   static async register(userName: string , password :string) {
      try {
         const res = await api.post("/auth/registration", {
           userName,
           password,
         });

         if(res.status === 201){
            logIn(false)
            return true;
         }

         return false;
      } catch (err) {
         axiosError(err);
      }
   }
}