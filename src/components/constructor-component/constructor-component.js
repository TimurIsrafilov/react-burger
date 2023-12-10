import PropTypes from "prop-types";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { useCallback } from "react";

import { useState, useEffect } from "react";

import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./constructor-component.module.css";

function ConstructorComponent(props) {
  const ref = useRef(null);

  const [, dropConstructor] = useDrop({
    accept: "constructorIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveIngredient(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const uniqueId = props.ingredient.uniqueId;
  const index = props.index;

  const [, dragConstructor] = useDrag(() => ({
    type: "constructorIngredient",
    item: { uniqueId, index },
  }));

  dragConstructor(dropConstructor(ref));

  return (
    <div
      className={`${styles.constructor_component_container} mt-4`}
      key={Math.random()}
    >
      <div ref={ref} className={styles.constructor_component_shift}>
        {props.ingredient.type !== "bun" && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        ingredient={props.ingredient}
        text={props.ingredient.name}
        price={props.ingredient.price}
        thumbnail={props.ingredient.image}
        key={props.ingredient.uniqueId}
        index={index}
        uniqueId={props.ingredient.uniqueId}
        moveIngredient={props.moveIngredient}
      />
    </div>
  );
}

// ConstructorComponent.propTypes = {
//   handleOnOpen: PropTypes.func,
//   onIngredientClick: PropTypes.func,
//   image: PropTypes.string,
//   price: PropTypes.number,
//   name: PropTypes.string,
// };

export default ConstructorComponent;
