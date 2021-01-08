import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { AuthProvider } from "./../lib/auth";
import customTheme from "./../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        {/* adds default themes by chakra-ui */}
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
