import { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang xử lý...");

  const setLoading = (state, text = "Đang xử lý...") => {
    setLoadingState(state);
    if (text) setLoadingText(text);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 10,
          flexDirection: "column",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" size={70} thickness={5} />
        <Box mt={2}>
          <Typography variant="h6" sx={{ color: "#fff", textAlign: "center" }}>
            {loadingText}
          </Typography>
        </Box>
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
