"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./../../redux/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>{" "}
    </Provider>
  );
}
