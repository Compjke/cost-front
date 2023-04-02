import { MutableRefObject, useRef, useState } from 'react';
import { deleteCostFx, updateCostFx } from '../../../api/costsClient';
import { deleteCost, updateCost } from '../../../context';
import { CostElProps } from '../../../types';
import { alertModal, getUserData } from '../../../utils/auth';
import { formatDate } from '../../../utils/format-date';
import { validateInput } from '../../../utils/validate';
import { MyButton } from '../../UI/MyButton';
import { DelSpinner } from '../../UI/Spinner/DeleteSpinner';
import cl from '../CostPage.module.css'

export const CostEl = ({cost , ind} : CostElProps) => {
   const [edit, setEdit] = useState(false);
   const [delSpinner, setDelSpinner] = useState(false)
   const [newText,setNewText] = useState(cost.text)
   const [newPrice,setNewPrice] = useState<string | number>(cost.price)
   const [newDate,setNewDate] = useState(cost.date)
   const textRef = useRef() as MutableRefObject<HTMLInputElement>;
   const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
   const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

   const delCost = async () => {

     const confirm = window.confirm('Are you sure you want to delete')

      if(confirm) {
          setDelSpinner(true);
      const authData = getUserData();

      await deleteCostFx({
         url:'/cost',
         token : authData.access_token,
         id: cost._id as string,
      })

      setDelSpinner(false)
      deleteCost(cost._id as string)
      alertModal({modalText:'Seccess DELETE' , modalStatus:'success'})
      return;
      }
     alertModal({modalText:'Canceled' , modalStatus:'warning'})
   }

   const updateCurrentCost = async () => {
      if(newText === cost.text &&
         +newPrice === +cost.price &&
         newDate === cost.date
         ){
            setEdit(false)
            return;
         }

         if(!validateInput(textRef,priceRef,dateRef)){
            return;
         }

        
         const authData = getUserData();

         const updateedcost = await updateCostFx({
            url : '/cost',
            token : authData.access_token,
            cost : {
               text : newText,
               price : +newPrice,
               date : newDate
            },
            id : cost._id as string
         })

         if(!updateedcost) {
            setEdit(false) 
            return;
         }
          
         setEdit(false)
         updateCost(updateedcost)
         alertModal({modalText:"Success UPDATED", modalStatus:"success"})
   }



   return(
      <li 
      className={cl.cost_item}
      id={cost._id as string}
      >
         <div className={cl.left}>
            {edit 
            ? <input
            ref={textRef}
            onChange={(e) => setNewText(e.target.value)} 
            value={newText} 
            type='text' 
            className={cl.shop_edit}/>
            : <span>{ind}. Shop :<strong className={cl.name} >" {cost.text} "</strong></span>
            }
            {edit 
            ? <input 
            ref={dateRef}
            onChange={(e) => setNewDate(e.target.value)}
            value={new Date(newDate).toISOString().split('T')[0]} 
            type='date' 
            className={cl.date_edit}/>
            : <span>Date: <strong className={cl.date}>{formatDate(cost.date as string)}</strong></span>
            }
           
             {edit 
            ? <input 
            ref={priceRef}
            onChange={(e) => setNewPrice(e.target.value)} 
            value={newPrice} 
            type='text' 
            className={cl.price_edit}/>
            : <span >Sum:<strong className={cl.price}>{cost.price} ₴</strong></span>
            }
            
         </div>
         <div className={cl.rigth}>
            {
               edit 
               ? <div className={cl.change_btns}>
                       <MyButton
                       onClick={updateCurrentCost} 
                        className={`btn btn-outline-success ${cl.btn1}`}
                        >
                        Save
                     </MyButton>
                       <MyButton 
                        className={`btn btn-outline-warning ${cl.btn1}`}
                        onClick={() => setEdit(false)}
                        >
                        Cancel
                     </MyButton>
               </div>
               :<MyButton 
               className={`btn btn-outline-warning ${cl.btn1}`}
               onClick={() => setEdit(true)}
               >
               Change
               </MyButton>
            }
            
            {
               delSpinner 
              
               ?<DelSpinner/>
               :<MyButton onClick={delCost} className={`btn btn-danger ${cl.btn1} ${cl.btn_del}`}>
                  <span>&times;</span>
               </MyButton>
            }
           
         </div>
      </li>
   )
}  