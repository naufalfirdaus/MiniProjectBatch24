import store from "@/redux-saga/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import { Roboto } from "next/font/google";
// import "tw-elements/dist/css/tw-elements.min.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
