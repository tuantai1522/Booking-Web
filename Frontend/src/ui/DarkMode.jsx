import { Button } from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
function DarkMode() {
  const context = useDarkMode();
  const { isDarkMode, handleDarkMode } = context;

  return (
    <>
      <Button onClick={handleDarkMode}>
        {isDarkMode ? (
          <DarkModeIcon style={{ fontSize: "2.5rem" }} />
        ) : (
          <LightModeIcon style={{ fontSize: "2.5rem" }} />
        )}
      </Button>
    </>
  );
}

export default DarkMode;
