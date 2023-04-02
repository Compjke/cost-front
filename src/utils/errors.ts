import { HandleAxiosErrorPayload, ICost } from '../types';
import {AxiosError} from 'axios'
import { alertModal, cleareAllData, getUserData } from './auth';
import { createCostFx, deleteCostFx, getCostFx, refreshTokenFx, updateCostFx } from '../api/costsClient';
import { createCost, setCosts, updateCost } from '../context';
export const axiosError = async (
   error : unknown,
   payload : HandleAxiosErrorPayload | null = null
) => {
   const errorMessage =
   ((error as AxiosError).response?.data as {message : string}).message 
   || ((error as AxiosError).response?.data as {error : string}).error

   if(errorMessage){
      if(errorMessage === 'jwt expired'){
         const payloadData = payload as HandleAxiosErrorPayload;
         const authData = getUserData();

         refreshTokenFx({
            url : 'auth/refresh',
            token : authData.refresh_token,
            userName : authData.userName
         });

         if(payload !== null){
            switch (payloadData.type) {
               case 'get':
                  const costs = await getCostFx({
                     url : '/cost',
                     token : authData.access_token
                  }) 

                  setCosts(costs)
                  break;
               case 'create':
                  const cost = await createCostFx({
                     url : '/cost',
                     token : authData.access_token,
                     cost : {...payload.createCost?.cost} as ICost
                  }) 
                  if(!cost) return;
                  createCost(cost)
                  alertModal({
                    modalText: "Success created",
                    modalStatus: "success",
                  });
                  break;
               case 'update':
                  const upCost = await updateCostFx({
                    url: "/cost",
                    token: authData.access_token,
                    cost: { ...payload.updateCost?.cost } as ICost,
                    id: payload.updateCost?.id as string,
                  }); 
                  if (!upCost) return;
                  updateCost(upCost);
                  alertModal({
                    modalText: "Success updated",
                    modalStatus: "success",
                  });
                  break;
               case 'delete':
                  await deleteCostFx({
                     url : '/cost',
                     token : authData.access_token,
                     id : payload.deleteCost?.id as string 
                  }) 

                  break;
               default:
                  return
            }
         }
      }else {
         alertModal({modalText : errorMessage , modalStatus : 'warning'});
         cleareAllData()
      }
   }else{
       alertModal({ modalText: errorMessage, modalStatus: "warning" });
   }

}