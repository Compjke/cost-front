import { useState , useEffect, useRef, MutableRefObject} from 'react';
import { $totalPrice, createCost } from '../../../context';
import { CostsHeaderProps } from '../../../types';
import { CountTotalPrice } from '../../../utils/totalPrice';
import { MyButton } from '../../UI/MyButton'
import { Spinner } from '../../UI/Spinner/Spinner';
import {useStore} from 'effector-react'
import { validateInput } from '../../../utils/validate';
import { alertModal, getUserData } from '../../../utils/auth';
import { createCostFx } from '../../../api/costsClient';
import cl from './CostHeader.module.css'

export const CostHeader = ({costs} : CostsHeaderProps) => {

const [spinner,setSpinner] = useState(false);
const total = useStore($totalPrice)
const textRef = useRef() as MutableRefObject<HTMLInputElement>
const priceRef = useRef() as MutableRefObject<HTMLInputElement>
const dateRef = useRef() as MutableRefObject<HTMLInputElement>
useEffect(() => {
   CountTotalPrice(costs)
}, [costs])

const formSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setSpinner(true);
   
    const text = textRef.current.value;
   const price = priceRef.current.value;
   const date = dateRef.current.value;

   if(!validateInput(textRef,priceRef,dateRef)){
      setSpinner(false);
      return;
   }

   const authData = getUserData();
   const cost = await createCostFx({
      url: '/cost',
      cost : {
         text : text,
         price : parseInt(price),
         date : date,
      },
      token : authData.access_token
   });

   if(!cost){
      setSpinner(false);
      return;
   }

   setSpinner(false);
   createCost(cost)
   alertModal({modalText : 'Success created' , modalStatus: 'success'})
}

   return (
   <div className={cl.cost_header}>
      <form onSubmit={formSubmit} className={cl.cost_form}>
        <div className={cl.form_el}>
         <span className='mb-3'>Where was it spent</span>
         <input ref={textRef} type="text"  className='form-control'/>
        </div>
        <div className={cl.form_el}>
         <span className='mb-3'>How much was spent?</span>
         <input ref={priceRef} type="text"  className='form-control'/>
        </div>
        <div className={cl.form_el}>
         <span className='mb-3'>When was it spent</span>
         <input ref={dateRef} type="date" className='form-control'/>
        </div>
         {spinner 
         ? <Spinner/>
         : <MyButton className={`btn btn-warning ${cl.add}`}>
               Add cost
            </MyButton>
         }
      </form>
      <div className={cl.total_c}>
         Total : <span className={cl.total}>
            {isNaN(total) ? 0 : +total} ₴
         </span> 
      </div>
   </div>
   )
}