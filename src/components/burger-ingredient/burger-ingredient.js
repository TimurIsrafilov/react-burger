import PropTypes from "prop-types";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import counter from "../../images/counter.svg";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

import { useDispatch, useSelector } from "react-redux";

import { showIngredient } from "../../services/ingredient/actions";

function BurgerIngredient(props) {
  // ({ id, text, index, moveCard })
  // const ref = useRef(null);

  const dispatch = useDispatch();

  const onIngredientClick = () => {
    // props.handleOnOpen();
    dispatch(showIngredient(item));
  };

  // const [, dragRef] = useDrag({
  //   type: "ingr",
  //   item: props.ingredient._id,
  // });

  // const [, drop] = useDrop({
  //   accept: "bun",
  // collect(monitor) {
  //   return {
  //     handlerId: monitor.getHandlerId(),
  //   }
  // },
  // hover(item, monitor) {
  //   if (!ref.current) {
  //     return;
  //   }
  //   const dragIndex = item.index;
  //   const hoverIndex = props.index;
  //   // Don't replace items with themselves
  //   if (dragIndex === hoverIndex) {
  //     return;
  //   }
  //   // Determine rectangle on screen
  //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //   // Get vertical middle
  //   const hoverMiddleY =
  //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //   // Determine mouse position
  //   const clientOffset = monitor.getClientOffset();
  //   // Get pixels to the top
  //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //   // Only perform the move when the mouse has crossed half of the items height
  //   // When dragging downwards, only move when the cursor is below 50%
  //   // When dragging upwards, only move when the cursor is above 50%
  //   // Dragging downwards
  //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //     return;
  //   }
  //   // Dragging upwards
  //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //     return;
  //   }
  //   // Time to actually perform the action
  //   props.moveIngredient(dragIndex, hoverIndex);
  //   // Note: we're mutating the monitor item here!
  //   // Generally it's better to avoid mutations,
  //   // but it's good here for the sake of performance
  //   // to avoid expensive index searches.
  //   item.index = hoverIndex;
  // },
  // });


  const item = props.ingredient;

  const [, drag] = useDrag(() => ({
    type: "ingredient",
    item: { item },
    //     // end: (item, monitor) => {
    //     //   const dropResult = monitor.getDropResult()
    //     //   if (item && dropResult) {
    //     //     alert(`You dropped ${item.name} into ${dropResult.name}!`)
    //     //   }
    //     // },
    //     // collect: (monitor) => ({
    //     //   isDragging: monitor.isDragging(),
    //     //   handlerId: monitor.getHandlerId(),
    //     // }),
  }));
  //   // const opacity = isDragging ? 0.4 : 1

  // const [{ isDragging }, drag] = useDrag(
  //   {
  //     type: "bun",
  //     item: props.ingredient._id,
  //     // return { id, index }
  //   }
  // collect: (monitor) => ({
  //   isDragging: monitor.isDragging(),
  // );

  // const opacity = isDragging ? 0 : 1
  // drag(drop(ref))



// const uniqueId = props.ingredient.uniqueId

// const [, dragConstructor] = useDrag(() => ({
//   type: "constructorIngredient",
//   // item: { uniqueId },
//   item: { uniqueId },
// }));

  return (
    <section className={styles.ingredient_card}>
      <img
        className={styles.ingredient_counter}
        src={counter}
        alt="Количество"
      />
      <div>
        <img ref={drag} 
          className={styles.ingredient_picture}
          src={props.ingredient.image}
          alt={props.ingredient.name}
          onClick={onIngredientClick}
        />
      </div>
      <div className={`${styles.ingredient_value} mt-1 mb-4`}>
        <div className="text text_type_digits-default mr-3">
          {props.ingredient.price}
        </div>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text__type_main-default">{props.ingredient.name}</p>
    </section>
  );
}

BurgerIngredient.propTypes = {
  handleOnOpen: PropTypes.func,
  onIngredientClick: PropTypes.func,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};

export default BurgerIngredient;
