import { Typography } from "@mui/material";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";

function Settings() {
  return (
    <>
      <Typography variant="h1" component="h1">
        Settings
      </Typography>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
