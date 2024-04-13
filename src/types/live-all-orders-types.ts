import { TypeLiveOrderData, TypeLiveOrdersData } from "./types";

export enum LiveAllOrdersActionType {
  DATA = "data",
}

export type Data = {
  type: LiveAllOrdersActionType.DATA;
  data: TypeLiveOrdersData;
  orders: Array<TypeLiveOrderData>;
};

export type LiveAllOrdersAction = Data;
