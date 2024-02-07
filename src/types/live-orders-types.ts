export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TypeOrderData = {
  ingredients: Array<number>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TypeLiveOrdersData = {
  success: boolean;
  orders: Array<TypeOrderData>;
  total: number;
  totalToday: number;
};

export type LiveAllOrders = Array<TypeLiveOrdersData>;

export enum LiveAllOrdersActionType {
  DATA = "data",
  INSERT = "insert",
  DELETE = "delete",
  UPDATE = "update",
  MOVE = "move",
}

export type Data = {
  type: LiveAllOrdersActionType.DATA;
  data: LiveAllOrders;
};

export type Insert = {
  type: LiveAllOrdersActionType.INSERT;
  data: {
    rows: Array<TypeLiveOrdersData>;
    pos: number;
  };
};

export type Update = {
  type: LiveAllOrdersActionType.UPDATE;
  data: LiveAllOrders;
};

export type Delete = {
  type: LiveAllOrdersActionType.DELETE;
  data: Array<number>;
};

export type Move = {
  type: LiveAllOrdersActionType.MOVE;
  data: Array<{ from: number; to: number }>;
};

export type LiveAllOrdersAction = Insert | Data | Delete | Update | Move;

export type LiveAllOrdersActions = Array<LiveAllOrdersAction>;
