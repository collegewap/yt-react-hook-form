import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import "./App.css";
import { useForm, type FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  name: string;
  email: string;
  website: string;
};
const MUIForm = () => {
  const form = useForm<FormValues>({
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log({ errors });
  };

  return (
    <div>
      <h1>MUI Registration Form</h1>
      <form
        className="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Stack spacing={3} width={500}>
          <TextField
            label="Name"
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField label="Website" {...register("website")} />
          <Button type="submit" variant="contained" color="info">
            Register
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default MUIForm;
