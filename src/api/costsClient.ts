import { createEffect } from 'effector';
import { CreatedCost, DelCost, GetCost, RefToken, UpdatedCost } from '../types';
import { cleareAllData } from '../utils/auth';
import { axiosError } from '../utils/errors';
import api from './axiosConfig'

export const createCostFx = createEffect(async ({url , cost , token} : CreatedCost) => {
   try {
      const {data} = await api.post(url,{...cost},{headers : {'Authorization' : `Bearer ${token}`}})
     return data
   } catch (err) {
       axiosError(err, { type: "create", createCost :{cost}});
   }
})

export const updateCostFx = createEffect(async ({url , cost , token , id} : UpdatedCost) => {
   try {
      const { data } = await api.patch(
        `${url}/${id}`,
        { ...cost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     return data
   } catch (err) {
       axiosError(err, { type: "update", updateCost :{cost ,id}});
   }
})

export const getCostFx = createEffect(async ({url ,token} : GetCost) => {
   try {
      const { data } = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
     return data
   } catch (err) {
      axiosError(err , {type : 'get'})
   }
})

export const deleteCostFx = createEffect(async ({url ,token ,id} : DelCost) => {
   try {
      await api.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
      });
   } catch (err) {
      axiosError(err , {type : 'delete', deleteCost:{id}})
   }
})


export const refreshTokenFx = createEffect(async ({url,token, userName}: RefToken) => {
   try {
      const res = await api.post(url, {refresh_token: token,userName})

      if(res.status === 200){
         localStorage.setItem('auth',
         JSON.stringify({
            ...res.data, 
            userName}));

         return res.data.access_token
      }else{
         cleareAllData();
      }


   } catch (err) {
      console.log(err)
   }
});