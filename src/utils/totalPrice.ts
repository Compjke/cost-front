import { setTotalPrice } from '../context';
import { ICost } from '../types';

export const CountTotalPrice = (costs: ICost[]) => {
  if (!costs) return;

  setTotalPrice(costs.reduce((acc, costObj) => acc + costObj.price, 0));
};