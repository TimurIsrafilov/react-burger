import { reducer as constructorReducer } from "./components/reducer";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as orderReducer } from "./order/reducer";
import { reducer as orderToShowReducer } from "./order-to-show/reducer";
import { reducer as userReducer } from "./user/reducer";
import { reducer as liveUserOrdersReducer } from "./live-user-orders/reducer";
import { reducer as liveAllOrdersReducer } from "./live-all-orders/reducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  components: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  ordertoshow: orderToShowReducer,
  user: userReducer,
  liveuserorder: liveUserOrdersReducer,
  liveallorders: liveAllOrdersReducer,
});
