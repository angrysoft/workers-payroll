import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IFetchMethod } from "../../hooks/useApi";

interface IFormProps {
  handleSubmit: CallableFunction;
  submitMethod?: IFetchMethod;
  formDefaultValues?: IFormValues;
  requiredFields?: Array<string>;
  children?: JSX.Element | JSX.Element[];
  action?: string;
  fluid?: boolean;
}

interface IFormValues {
  [key: string]: any;
}

interface ISubmitOptions {
  action: string;
  method: IFetchMethod;
}

interface IFromContext {
  setValue: (filedName: string, fieldValue: any) => void;
  getValue: (filedName: string) => any;
  isRequired: (filedName: string) => boolean;
}

const FormContext = createContext<IFromContext>({
  setValue: () => "",
  getValue: () => "",
  isRequired: () => false,
});

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const [values, setValues] = useState<IFormValues>(
      props.formDefaultValues || {},
  );

  const [requiredFields, setRequiredFields] = useState<Array<string>>([]);

  useEffect(() => {
    props.formDefaultValues && setValues(props.formDefaultValues);
  }, [props.formDefaultValues]);

  useEffect(() => {
    setRequiredFields(props.requiredFields || []);
  }, [props.requiredFields]);

  const setValue = useCallback(
      (filedName: string, fieldValue: any) =>
        setValues((vs) => {
          const newValue: IFormValues = { ...vs };
          newValue[filedName] = fieldValue;
          return newValue;
        }),
      [setValues],
  );

  const getValue = useCallback(
      (filedName: string) => {
        return values[filedName];
      },
      [values],
  );

  const isRequired = useCallback(
      (filedName: string) => requiredFields.includes(filedName),
      [requiredFields],
  );

  const form = {
    setValue: setValue,
    getValue: getValue,
    isRequired: isRequired,
  };

  return (
    <div className={`p-1 md:p-2${props.fluid && " w-full"}`}>
      <form
        action={props.action || ""}
        onSubmit={(ev: SyntheticEvent) =>
          props.handleSubmit(ev, values, {
            action: props.action,
            method: props.submitMethod || "POST",
          })
        }
        className="grid gap-1 grid-cols-1 p-2 bg-white rounded-lg"
      >
        <FormContext.Provider value={form}>
          {props.children}
        </FormContext.Provider>
      </form>
    </div>
  );
};

export { Form, FormContext };
export type { IFormValues, ISubmitOptions };
