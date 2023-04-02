import cl from './Spinner.module.css'

export const Spinner = ({...props}) => {

   return (
      <div 
      role='status'
      // style={{top : `${top}px`, left :`${left}px`}}
      className={cl.spinner} 
      {...props}
      >
         <span className={cl.loader}>L &nbsp; ading</span>
      </div>
   )

}