import { ChangeEvent, useCallback, useState } from "react";

type TypeUseForm<T> = {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInputChanged: boolean;
  resetForm: () => void;
};

export function useForm<T>(inputValues: T): TypeUseForm<T> {
  const [values, setValues] = useState(inputValues);
  const [isInputChanged, setisInputChanged] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setisInputChanged(true);
  };

  const resetForm = useCallback(() => {
    setValues(inputValues);
    setisInputChanged(false);
  }, [setValues]);

  return { values, handleChange, isInputChanged, resetForm };
}
