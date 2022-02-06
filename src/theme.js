import { createTheme } from "@material-ui/core/styles";
import data from "../resumeData.json";
const { theme } = data

export const lightTheme = createTheme(
  (theme && theme.light && Object.keys(theme.light).length > 0) ? theme.light :
  {
    palette: {
      type: "light"
    }
  }
)

export const darkTheme = createTheme(
  (theme && theme.dark && Object.keys(theme.dark).length > 0) ? theme.dark :
  {
    palette: {
      type: "dark"
    }
  }
)