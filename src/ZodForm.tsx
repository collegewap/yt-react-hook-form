import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import "./App.css";
type FormValues = {
  name: string;
  email: string;
  website: string;
};

const schema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().nonempty("Email is required").email(),
  website: z
    .string()
    .nonempty("Website is required")
    .regex(/^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/, "Invalid website"),
});

function ZodForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitHandler = async (data: FormValues) => {
    console.log("data", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const onErrorHandler = (errors: FieldErrors<FormValues>) => {
    console.log({ errors });
  };

  return (
    <>
      <h1>Zod Registration Form</h1>
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
            <input type="text" id="name" {...register("name")} />
            <div className="error">{errors.name?.message}</div>
          </div>
        </div>

        <div className="form-control">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input type="text" id="email" {...register("email")} />
            <div className="error">{errors.email?.message}</div>
          </div>
        </div>

        <div className="form-control">
          <div>
            <label htmlFor="website">Website</label>
          </div>
          <div>
            <input type="text" id="website" {...register("website")} />
            <div className="error">{errors.website?.message}</div>
          </div>
        </div>

        <input type="submit" value="Register" />
      </form>
      <DevTool control={control} />
    </>
  );
}

export default ZodForm;
