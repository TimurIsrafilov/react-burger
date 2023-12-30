import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./constructor-component.module.css";

import { deleteIngredient } from "../../services/components/actions";

import { moveIngredient } from "../../services/components/actions";

function ConstructorComponent({ index, ingredient }) {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const uniqueId = ingredient.uniqueId;

  function deleteIngr(uniqueId) {
    dispatch(deleteIngredient(uniqueId));
  }

  function handleOnMoveIngredient(dragIndex, hoverIndex) {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  }

  const [{ handlerId }, dropConstructor] = useDrop({
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
      handleOnMoveIngredient(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragConstructor] = useDrag({
    type: "constructorIngredient",
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  });

  const opacity = isDragging ? 0 : 1;

  dragConstructor(dropConstructor(ref));

  return (
    <div ref={ref} className={`${styles.constructor_component_container}`}>
      <div
        className={`${styles.constructor_component_shift}  "opacity=${opacity}"`}
      >
        {ingredient.type !== "bun" && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        ingredient={ingredient}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        index={index}
        uniqueId={uniqueId}
        handleOnMoveIngredient={handleOnMoveIngredient}
        handleClose={() => deleteIngr(uniqueId)}
      />
    </div>
  );
}

export default ConstructorComponent;
