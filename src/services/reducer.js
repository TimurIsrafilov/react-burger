import { reducer as constructorReducer } from "./components/reducer";
import { reducer as ingredientReducer } from "./ingredient/reducer";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as orderReducer } from "./order/reducer";
import { reducer as userReducer } from "./user/reducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  components: constructorReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
});
