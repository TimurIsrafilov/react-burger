import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./constructor-component.module.css";

import {
  deleteIngredient,
  moveIngredient,
} from "../../services/components/reducer";
import { TypeIngredienInfo } from "../../utils/types";
import { useAppDispatch } from "../../hooks/hooks";

type TypeDragObject = {
  index: number;
};

type TypeDragCollectedProps = {
  isDragging: boolean;
};

type TypeDropCollectedProps = {
  isOver: boolean;
};

type TypeUniqueIngredienInfo = TypeIngredienInfo & {
  uniqueId: string;
};

type TypeConstructorComponentData = {
  index: number;
  ingredient: TypeUniqueIngredienInfo;
};

function ConstructorComponent({
  index,
  ingredient,
}: TypeConstructorComponentData): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const uniqueId = ingredient.uniqueId;

  function deleteIngr(uniqueId: string) {
    dispatch(deleteIngredient(uniqueId));
  }

  function handleOnMoveIngredient(dragIndex: number, hoverIndex: number) {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  }

  const [{ isOver }, dropConstructor] = useDrop<
    TypeDragObject,
    unknown,
    TypeDropCollectedProps
  >({
    accept: "constructorIngredient",
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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

  const [{ isDragging }, dragConstructor] = useDrag<
    TypeDragObject,
    unknown,
    TypeDragCollectedProps
  >({
    type: "constructorIngredient",
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragConstructor(dropConstructor(ref));

  return (
    <div
      ref={ref}
      className={`${styles.constructor_component_container}`}
      style={isDragging || isOver ? { opacity: 0.2 } : { opacity: 1 }}
    >
      <div className={`${styles.constructor_component_shift}`}>
        {ingredient.type !== "bun" && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteIngr(uniqueId)}
      />
    </div>
  );
}

export default ConstructorComponent;
