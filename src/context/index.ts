import { createDomain } from "effector";
import { ICost } from '../types';

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCost = costs.createEvent<ICost>();
export const updateCost = costs.createEvent<ICost>();
export const deleteCost = costs.createEvent<string | number>();

const removeCost = (costs : ICost[], id: string | number) => 
    costs.filter(c => c._id !== id)

const editCost = (
  costs : ICost[], 
  id: string | number, 
  newValues : Partial<ICost>) => 
    costs.map(c => {
      if(c._id === id){
        return {
          ...c,
          ...newValues
        }
      }

      return c;
    })


  


export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCost, (prev, cost) => [...prev, cost])
  .on(setCosts, (_, costs) => costs)
  .on(deleteCost, (prev, id) => [...removeCost(prev, id)])
  .on(updateCost, (prev, cost) => [...editCost(
    prev, 
    cost._id as string, 
    {
      text: cost.text,
      price : cost.price,
      date : cost.date
    }
    )]);

export const setTotalPrice = costs.createEvent<number>();


export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);

