import { type } from "@testing-library/user-event/dist/type";
import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

interface IFormProps {
  handleSubmit: CallableFunction;
  formDefaultValues?: object;
  children?: JSX.Element | JSX.Element[];
}

interface IFormValues {
  [key:string]: any;
}

interface IFromContext {
  setValue: (filedName: string, fieldValue: any) => void;
  getValue: (filedName: string) => any;
}

const FormContext = createContext<IFromContext>({
  setValue: () => "",
  getValue: () => "",
});

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const [values, setValues] = useState<IFormValues>({});
  const setValue = useCallback((filedName: string, fieldValue: any) =>
    setValues((vs) => {
      const newValue: IFormValues = { ...vs };
      newValue[filedName] = fieldValue;
      console.log(newValue);
      return newValue;
    })
  , [setValues]);

  const getValue = useCallback(
      (filedName: string) => values[filedName],
      [values],
  );

  const form = {
    setValue: setValue,
    getValue: getValue,
  };

  return (
    <div className="p-1 md:p-2">
      <form
        action=""
        onSubmit={(ev: SyntheticEvent) => props.handleSubmit(ev, values)}
        className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"
      >
        <FormContext.Provider value={form}>
          {props.children}
        </FormContext.Provider>
      </form>
    </div>
  );
};

export { Form, FormContext};
export type { IFormValues };
