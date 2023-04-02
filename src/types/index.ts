export interface Modal {
  modalText: string;
  modalStatus: string;
}

export interface ModalProps {
  props: Modal;
}


export interface CostsHeaderProps {
  costs: ICost[];
}

export interface ICost {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}
export interface CreatedCost {
  url: string;
  cost: ICost;
  token: string;
}
export interface UpdatedCost extends CreatedCost{
  id : string | number;
}
export interface GetCost {
  url: string;
  token: string;
}
export interface DelCost {
  url: string;
  token: string;
  id : string | number;
}

export interface RefToken {
  url : string;
  token : string;
  userName : string;
}

export interface HandleAxiosErrorPayload{
  type : string;
  createCost? : Partial<CreatedCost>;
  getCost? : Partial<GetCost>;
  deleteCost? : Partial<DelCost>;
  updateCost? : Partial<UpdatedCost>;
}

export interface CostElProps {
  cost : ICost;
  ind : number;
}