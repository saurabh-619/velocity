import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";
import customTheme from "../styles/theme";
import { Global, css } from "@emotion/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const GlobalStyle = ({ children }) => {
    return (
      <>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <CSSReset />
        <Global
          styles={css`
            html {
              min-width:360px,
              scroll-behavior: smooth;
            }
            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            :focus {
              outline: 0 !important;
              box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
            } 

            a:hover{
              text-decoration: none !important;
            } 
          `}
        />
        {children}
      </>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        {/* adds default themes by chakra-ui */}
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
