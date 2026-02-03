import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CurrencyProvider>
        <Component {...pageProps} />
      </CurrencyProvider>
    </SessionProvider>
  );
}
