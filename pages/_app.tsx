import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "../styles/global.module.css"
import Navbar from "../components/Navbar"

// import { useChain, useConnectionStatus } from "@thirdweb-dev/react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";
// const chain : any = defineChain(80002)


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const smartWalletOptions = {
    factoryAddress: "0x3De43234aEBe2696cEEEe7426582aAc034B427e1",
    gasless: true,
  };

  return (
    <ThirdwebProvider
      clientId={
        process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID ||
        "3149bb75c33cb71aee2b962425de48d9"
      }
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(metamaskWallet(), smartWalletOptions),
        smartWallet(
          embeddedWallet({
            auth: {
              options: ["email", "google", "apple","facebook"],
            },
          }),
          smartWalletOptions
        ),
      ]}
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        {/* {router.pathname === "/profile/[address]" ? null : <Footer />} */}
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
