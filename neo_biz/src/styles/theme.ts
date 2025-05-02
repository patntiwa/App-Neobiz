export const lightTheme = {
    background: "bg-white",
    surface: "bg-gray-100",
    text: "text-gray-900",
    card: "bg-white shadow-md",
    input: "bg-white border border-gray-300 text-gray-900",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  };
  
  export const darkTheme = {
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    card: "bg-gray-800 shadow-md",
    input: "bg-gray-700 border border-gray-600 text-white",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  };
  
  export type Theme = typeof lightTheme;
  
  export const getTheme = (mode: "light" | "dark"): Theme => {
    return mode === "light" ? lightTheme : darkTheme;
  };
  