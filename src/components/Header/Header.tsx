import { useToogleTheme } from '../../hooks'
import { MyButton } from '../UI/MyButton'
import style from './Header.module.css'
import {Link} from 'react-router-dom'
import {useStore} from 'effector-react' 
import { $isLogin, $user } from '../../context/auth'
import { cleareAllData } from '../../utils/auth'
export const Header = () => {

   const {toogleTheme, currentTheme} = useToogleTheme()
   const user = useStore($user);
   const isLogin = useStore($isLogin);
   return(
      <header>
         <div 
         className={`navbar navbar-dark ${currentTheme==='dim' ? style.navbar_dark : style.navbar_ligth}`}>
            <Link to='/'
            className={style.main_title}
            >Your Cost</Link>
            {user.length ? <h2>Hello, {user}</h2> : null}
            
            <MyButton
            onClick={toogleTheme}
            className={`btn btn-${currentTheme === 'dim' ? 'light'  : 'info'} ${style.theme}`}
            >Go {currentTheme === 'dim' ? 'light'  : 'dark'}
            </MyButton>
            
            {isLogin && 
               <MyButton 
               className={`btn btn-sm btn-outline-${currentTheme === 'dim' ? 'warning'  : 'secondary'} ${style.logout}`}
               onClick={cleareAllData}>
               Logout 
               </MyButton>}
         </div>
      </header>
   )
}




