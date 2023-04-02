import { MutableRefObject } from 'react';
import { alertModal } from './auth';
export const validateInput = (
   inputText: MutableRefObject<HTMLInputElement>,
   inputPrice: MutableRefObject<HTMLInputElement>,
   inputDate: MutableRefObject<HTMLInputElement>,
) => {

   const text = inputText.current.value;
   const price = inputPrice.current.value;
   const date = inputDate.current.value;


   const inputsGroup = [
      inputText.current,
      inputPrice.current,
      inputDate.current
   ];


   const addWarningBorder = () => {
      inputsGroup.forEach(input => {
         input.value.length 
         ? input.classList.remove('border-danger')
         : input.classList.add('border-danger')
      })
   }

   if(!text || !price || !date) {
      alertModal({ modalText: "Fill in all the fields", modalStatus: 'warning' });
      addWarningBorder()
      return false;
   };

   if(isNaN(+price)) {
        alertModal({
          modalText: "The price field must have a numeric value",
          modalStatus: "warning",
        });

        inputPrice.current.classList.add('border-danger')
        return false
   }

   inputText.current.value = '';
   inputPrice.current.value = '';
   inputDate.current.value = '';
   inputsGroup.forEach(input => input.classList.remove('border-danger'))
   return true;
}
