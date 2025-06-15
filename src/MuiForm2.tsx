import React from "react";

import { Stack, TextField, Button } from "@mui/material";
const MuiForm2 = () => {
  return (
    <div>
      <form onSubmit={}>
        <Stack gap={3} width={"300px"}>
          <TextField label="Name" />
          <TextField label="Email" />
          <TextField label="Website" />
          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </div>
  );
};

export default MuiForm2;
