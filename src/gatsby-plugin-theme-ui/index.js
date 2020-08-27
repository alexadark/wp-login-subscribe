// See other presets to try at https://theme-ui.com/packages/presets
import { deep } from "@theme-ui/presets"
export default {
  ...deep,
  buttons: {
    primary: {
      color: "background",
      bg: "tomato",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
  styles: {
    ...deep.styles,
  },
}
