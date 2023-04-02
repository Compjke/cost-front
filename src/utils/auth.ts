import { setCosts } from '../context';
import { logIn, setUser } from '../context/auth';
import { setModal } from '../context/modal';
import { Modal } from '../types/index';

export const cleareAllData = () => {
   localStorage.removeItem('auth');
   logIn(false);
   setUser('');
   setCosts([]);
}

export const getUserData = () => {
   try {
      const userData = JSON.parse(localStorage.getItem('auth') as string)
      if(!userData){
         cleareAllData();
         return;
      }

      return userData;
   } catch (err) {
      cleareAllData()
   }
}

export const alertModal = (modal : Modal) => {
   setModal(modal)
   setTimeout(() => setModal({ modalText: '', modalStatus: '' }), 3000);
}