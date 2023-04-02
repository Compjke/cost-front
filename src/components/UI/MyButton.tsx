
export const MyButton = ({children, className,...props}: any) =>{
   // console.log(props)
   return <button {...props} className={className}>{children}</button>;
}