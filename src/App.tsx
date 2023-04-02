import { useEffect } from 'react';
import { useStore } from 'effector-react';
import {Routes ,Route, Navigate} from 'react-router-dom'
import { AuthPage } from './components/AuthPage/AuthPage';
import { Header } from './components/Header/Header';
import { $isLogin, logIn, setUser } from './context/auth';
import { $modal } from './context/modal';
import { Modal } from './components/UI/Modal/Modal';
import { CostPage } from './components/CostPage/CostPage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { cleareAllData, getUserData } from './utils/auth';


function App() {
  const isLogin = useStore($isLogin)
  const modal = useStore($modal)
  console.log(modal)


  useEffect(() => {
    const auth = getUserData()
    if(!auth || !auth.access_token || !auth.refresh_token){
      cleareAllData();
    }else{
      logIn(true)
      setUser(auth.userName)
    }
  }, [])
  return (
    <div >
      <Header/>
      {modal.modalText && <Modal props={modal}/> }
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to={'/costs'}/> : <Navigate to='/login'/>} />
        <Route path='/register' element={isLogin ? <Navigate to={'/costs'}/> : <AuthPage type={'register'}/>} />
        <Route path='/login' element={isLogin ? <Navigate to={'/costs'}/> : <AuthPage type='login'/>} />
        <Route path='/costs' element={isLogin ? <CostPage /> : <Navigate to={'/login'}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
