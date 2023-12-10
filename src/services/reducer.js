import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as constructorReducer } from "./components/reducer";
import { reducer as ingredientReducer } from "./ingredient/reducer";
import { reducer as orderReducer } from "./order/reducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  components: constructorReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
});
