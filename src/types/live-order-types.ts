export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TypeLiveOrderData = {
  ingredients: Array<string>;
  _id: string;
  owner?: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TypeLiveOrdersData = {
  success: boolean;
  orders: Array<TypeLiveOrderData>;
  total?: number;
  totalToday?: number;
};

export type LiveAllOrders = Array<TypeLiveOrdersData>;

export enum LiveUserOrderActionType {
  DATA = "data",
  INSERT = "insert",
  DELETE = "delete",
  UPDATE = "update",
  MOVE = "move",
}

export type Data = {
  type: LiveUserOrderActionType.DATA;
  data: LiveAllOrders;
};

export type Insert = {
  type: LiveUserOrderActionType.INSERT;
  data: {
    rows: Array<TypeLiveOrdersData>;
    pos: number;
  };
};

export type Update = {
  type: LiveUserOrderActionType.UPDATE;
  data: LiveAllOrders;
};

export type Delete = {
  type: LiveUserOrderActionType.DELETE;
  data: Array<number>;
};

export type Move = {
  type: LiveUserOrderActionType.MOVE;
  data: Array<{ from: number; to: number }>;
};

export type LiveUserOrderAction = Insert | Data | Delete | Update | Move;

export type LiveUserOrderActions = Array<LiveUserOrderAction>;
