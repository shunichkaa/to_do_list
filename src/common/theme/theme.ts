import { createTheme } from "@mui/material/styles"

export const getTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#087EA4",
      },
    },
  })
}
