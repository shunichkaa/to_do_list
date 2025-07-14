import type { Preview } from "@storybook/react-webpack5"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import React from "react"

const theme = createTheme({
  palette: {
    mode: "light",
  },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    docs: {
      source: {
        state: "open",
      },
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(ThemeProvider, { theme }, [
        React.createElement(CssBaseline, { key: "css-baseline" }),
        React.createElement(Story, { key: "story" }),
      ])
    },
  ],
}

export default preview
