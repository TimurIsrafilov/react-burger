import PropTypes from "prop-types";

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

  const bun = props.ingredients
    .filter((ingredient) => ingredient.type === "bun")
    .slice(0, 1);

  return (
    <section className={`${styles.constructor_container} `}>
      <div className={`${styles.constructor_ingredients_container} mt-4`}>
        {bun.map((ingredient) => (
          <div
            className={`${styles.constructor_ingredient_container} mt-4`}
            key={ingredient._id + 1}
          >
            <div className={styles.constructor_ingredient_shift}>
              {ingredient.type !== "bun" && <DragIcon type="primary" />}
            </div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              key={ingredient._id}
            />
          </div>
        ))}
        <div
          className={`${styles.constructor_ingredients_secondary} custom-scroll`}
        >
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
        </div>
        {bun.map((ingredient) => (
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
              text={`${ingredient.name} (низ)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              key={ingredient._id}
            />
          </div>
        ))}
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
