import {
  useFieldArray,
  useForm,
  useWatch,
  type FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./App.css";
import { useEffect } from "react";

type FormValues = {
  name: string;
  email: string;
  website: string;
  social: {
    x: string;
    instagram: string;
  };
  phoneNumbers: string[];
  emergencyContact: {
    name: string;
    phone: string;
  }[];
  dob: Date;
  height: number;
};

let counter = 0;
function App() {
  const form = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      phoneNumbers: ["", ""],
      emergencyContact: [
        {
          name: "",
          phone: "",
        },
      ],
    },
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     name: "John",
    //     email: data.email,
    //     website: "",
    //   };
    // },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    isDirty,
    isValid,
    touchedFields,
    dirtyFields,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  counter++;

  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const emergencyContacts = useFieldArray({
    control,
    name: "emergencyContact",
  });

  const submitHandler = async (data: FormValues) => {
    console.log("data", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  // const allValues = watch();
  // console.log({ allValues });

  const name = useWatch({
    control,
    name: "name",
  });

  // console.log({ name });

  const handleGetValues = () => {
    const value = getValues(["name", "email"]);
    // console.log({ value });
  };

  const handleSetValue = () => {
    setValue("name", "John", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log({ value });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onErrorHandler = (errors: FieldErrors<FormValues>) => {
    console.log({ errors });
  };

  const resetHandler = () => {
    reset();
  };

  const handleValidate = () => {
    trigger();
  };

  return (
    <>
      <h1>Registration Form [{counter}]</h1>
      <form
        className="form"
        noValidate
        onSubmit={handleSubmit(submitHandler, onErrorHandler)}
      >
        <div className="form-control">
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            <div className="error">{errors.name?.message}</div>
          </div>
        </div>

        <div className="form-control">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              type="text"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
                validate: {
                  isNotAdmin: (value) => {
                    return (
                      value !== "admin@example.com" ||
                      "This email is not allowed"
                    );
                  },
                  isNotBannedDomain: (value) => {
                    return (
                      !value.includes("banned-domain.com") ||
                      "This domain is not allowed"
                    );
                  },
                  notRegistered: async (value) => {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${value}`
                    );
                    const data = await response.json();
                    return data.length === 0 || "Already registered";
                  },
                },
              })}
            />
            <div className="error">{errors.email?.message}</div>
          </div>
        </div>
        <div className="form-control">
          <div>
            <label htmlFor="website">Website</label>
          </div>
          <div>
            <input type="text" id="website" {...register("website")} />
          </div>
        </div>
        <h2>Socials</h2>

        <div className="form-control">
          <div>
            <label htmlFor="x">X Handle</label>
          </div>
          <div>
            <input type="text" id="x" {...register("social.x")} />
          </div>
        </div>
        <div className="form-control">
          <div>
            <label htmlFor="instagram">Instagram Handle</label>
          </div>
          <div>
            <input
              type="text"
              id="instagram"
              {...register("social.instagram")}
            />
          </div>
        </div>

        <div className="form-control">
          <div>
            <label htmlFor="primaryNo">Primary phone number</label>
          </div>
          <div>
            <input type="text" id="primaryNo" {...register("phoneNumbers.0")} />
          </div>
        </div>
        <div className="form-control">
          <div>
            <label htmlFor="secondaryNo">Secondary phone number</label>
          </div>
          <div>
            <input
              type="text"
              id="secondaryNo"
              {...register("phoneNumbers.1", {
                disabled: watch("phoneNumbers.0") === "",
              })}
            />
          </div>
        </div>

        <h2>Emergency contacts</h2>
        {emergencyContacts.fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="form-control">
                <div>
                  <label htmlFor={`ec-${index}-name`}>Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id={`ec-${index}-name`}
                    {...register(`emergencyContact.${index}.name`)}
                  />
                </div>
              </div>
              <div className="form-control">
                <div>
                  <label htmlFor={`ec-${index}-phone`}>Phone</label>
                </div>
                <div>
                  <input
                    type="text"
                    id={`ec-${index}-phone`}
                    {...register(`emergencyContact.${index}.phone`)}
                  />
                </div>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => emergencyContacts.remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => emergencyContacts.append({ name: "", phone: "" })}
        >
          Add contact
        </button>
        <div className="form-control">
          <div>
            <label htmlFor="dob">Date of birth</label>
          </div>
          <div>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
              })}
            />
          </div>
        </div>

        <div className="form-control">
          <div>
            <label htmlFor="height">Height (cm)</label>
          </div>
          <div>
            <input
              type="number"
              id="height"
              {...register("height", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>

        <input
          type="submit"
          value="Register"
          disabled={!isValid || !isDirty || isSubmitting}
        />
        <button type="reset" onClick={resetHandler}>
          Reset
        </button>

        <button type="button" onClick={handleValidate}>
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default App;
