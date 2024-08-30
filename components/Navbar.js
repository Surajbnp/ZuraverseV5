import React from "react";
import styles from "../styles/navbar.module.css";
import { Box } from "@chakra-ui/react";
import BoxBtn from "./BoxBtn";
import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";

const Navbar = () => {
  const address = useAddress();

  return (
    <Box className={styles.cont}>
      <Box border={"none"} className={styles.logo}>
        <img
          src="https://zuraverse.xyz/wp-content/uploads/2020/10/V5.png.webp"
          alt="logo"
        />
      </Box>
      <Box className={styles.links}>
        <BoxBtn innerText={"Homepage"} to="/" />
        <BoxBtn innerText={"Universe"} to="/universe" />
        <BoxBtn innerText={"Marketplace"} />
        <BoxBtn innerText={"Quests"} to={"/quests"} />
        <BoxBtn innerText={"Games"} to="/games" />
        <BoxBtn innerText={"Refer & Earn"} to={"/about"} />
        <BoxBtn innerText={"About Us"} to={"/about"} />
      </Box>
      <Box className={styles.loginBtn}>
        <Box>
          <ConnectWallet
            theme={darkTheme({
              colors: {
                accentText: "#ff00ea",
                accentButtonBg: "red",
              },
            })}
            btnTitle="Login"
            modalTitle={"Zuraverse"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              title: "Welcome to the world of Zuraverse",
              img: {
                src: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1716202161/Zura_Market_Favicon_aifcw4.png",
                width: 150,
                height: 150,
              },
            }}
            modalTitleIconUrl={
              "https://res.cloudinary.com/dddnxiqpq/image/upload/v1716202161/Zura_Market_Favicon_aifcw4.png"
            }
          />
        </Box>
        <Box className={styles.videoButton}>
          <video
            src="https://zuraverse.xyz/wp-content/uploads/2023/08/Hack-Run-low.mp4"
            autoPlay
            loop
            muted
            className={styles.video}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;

/*         

<Box className={styles.connectWallet}>
            <ConnectWallet
              theme={darkTheme({
                colors: {
                  accentText: "#ff00ea",
                  accentButtonBg: "#ff00ea",
                },
              })}
              btnTitle="Login"
              modalTitle={"Zura Marketplace"}
              switchToActiveChain={true}
              modalSize={"wide"}
              welcomeScreen={{
                title: "Welcome to the world of Zuraverse",
                img: {
                  src: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1716202161/Zura_Market_Favicon_aifcw4.png",
                  width: 150,
                  height: 150,
                },
              }}
              modalTitleIconUrl={
                "https://res.cloudinary.com/dddnxiqpq/image/upload/v1716202161/Zura_Market_Favicon_aifcw4.png"
              }
            />
          </Box>
          <Box>
            {address && (
              <Link as={NextLink} href={`/profile/${address}`}>
                <Tooltip hasArrow label={"Profile"}>
                  <Avatar
                    border={"2px solid #444444"}
                    src="https://imgur.com/752APp1.png"
                    ml={"10px"}
                  />
                </Tooltip>
              </Link>
            )}
          </Box>

*/
