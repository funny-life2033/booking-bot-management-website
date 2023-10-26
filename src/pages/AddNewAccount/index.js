import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerClient } from "../../store/authSlice";
import { checkPageStatus } from "../../utils/config";

const AddNewAccount = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isRegisteringClient, registeringClientError } = useSelector(
    (state) => state.user
  );

  const registerHandle = (e) => {
    e.preventDefault();

    dispatch(registerClient({ username, password }));
  };

  useEffect(() => {
    if (!isRegisteringClient) {
      if (!registeringClientError) {
        checkPageStatus("hi");
      }
    }
  }, [isRegisteringClient, registeringClientError]);

  return (
    <form onSubmit={registerHandle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          mt: 20,
        }}
      >
        <TextField
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: 400 }}
          label="Username"
          error={registeringClientError !== null}
          helperText={registeringClientError}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: 400 }}
          label="Password"
          error={registeringClientError !== null}
          helperText={registeringClientError}
        />

        <Button type="submit" variant="contained">
          Add Account
        </Button>
      </Box>
    </form>
  );
};

export default AddNewAccount;
