import { TypeLiveOrderData, TypeLiveOrdersData } from "./types";

export enum LiveUserOrdersActionType {
  DATA = "data",
}

export type Data = {
  type: LiveUserOrdersActionType.DATA;
  data: TypeLiveOrdersData;
  orders: Array<TypeLiveOrderData>;
};

export type LiveUserOrdersAction = Data;
