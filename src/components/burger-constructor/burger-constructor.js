import PropTypes from 'prop-types';

import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  let sum = 0;

  for (let i = 0; i < props.ingredients.length; i++) {
    sum += props.ingredients[i].price;
  }

  return (
    <section className={`${styles.constructor_container} ml-15`}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={`${styles.constructor_ingredients_container} custom-scroll`}
      >
        {props.ingredients.map((ingredient) =>
          ingredient.type === "bun" ? (
            <div
              className={styles.constructor_ingredient_container}
              key={ingredient._id + 1}
            >
              <div className={styles.constructor_ingredient_shift}>
                {ingredient.type !== "bun" && <DragIcon type="primary" />}
              </div>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                key={ingredient._id}
              />
            </div>
          ) : (
            ""
          )
        )}
        {props.ingredients.map((ingredient) =>
          ingredient.type !== "bun" ? (
            <div
              className={styles.constructor_ingredient_container}
              key={ingredient._id + 1}
            >
              <div className={styles.constructor_ingredient_shift}>
                {ingredient.type !== "bun" && <DragIcon type="primary" />}
              </div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                key={ingredient._id}
              />
            </div>
          ) : (
            ""
          )
        )}
        {props.ingredients.map((ingredient) =>
          ingredient.type === "bun" ? (
            <div
              className={styles.constructor_ingredient_container}
              key={ingredient._id + 1}
            >
              <div className={styles.constructor_ingredient_shift}>
                {ingredient.type !== "bun" && <DragIcon type="primary" />}
              </div>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                key={ingredient._id}
              />
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className={`${styles.constructor_total_price} mt-10`}>
        <div className={`${styles.constructor_ingredient_value} mr-5`}>
          <div className="text text_type_digits-default mr-2">{sum}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={props.handleOnOpen}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array,
  handleOnOpen: PropTypes.func,
}; 

export default BurgerConstructor;
