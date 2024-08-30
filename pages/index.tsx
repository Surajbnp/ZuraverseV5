import { NextPage } from "next";
import React from "react";
import styles from "../styles/homepage.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Crousel from "../components/Crousel";
import ButtonComp from "../components/ButtonComp";
import Fade from "react-reveal/Fade";
import Shake from "react-reveal/Shake";
import Roll from "react-reveal/Roll";
// import Footer from "../components/Footer";


const Home: NextPage = () => {


  const handlePlayGame = () => {
    window.open(
      "https://hackrunv3.s3.ap-south-1.amazonaws.com/index.html",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Box className={styles.container}>
      <Box>
        <Crousel />
        <Flex className={styles.updateBox}>
          <Box>
            <Text>WHATS</Text>
              <Text className={styles.yellowTxt}>NEW</Text>
            <Button
              w={"150px"}
              h={"60px"}
              bg={"white"}
              color={"black"}
              fontSize={"20px"}
              mt={10}
              borderRadius={"none"}
            >
              Read more
            </Button>
          </Box>
          <Box className={styles.updateTxt}>
            <fieldset className={styles.filedset}>
                <legend className={styles.legend}>
                  FAME, FORTUNE AND THE FUTURE: TALKING WITH UZOMA ABRAHAM
                </legend>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente quisquam quam pariatur animi perspiciatis vel omnis,
                commodi ab repellat provident est. Ipsam, labore! Corporis
                repellendus dolorum quibusdam! Minima, esse maiores.
              </p>
            </fieldset>
            <fieldset className={styles.filedset}>
                <legend className={styles.legend}>
                  FAME, FORTUNE AND THE FUTURE: TALKING WITH UZOMA ABRAHAM
                </legend>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente quisquam quam pariatur animi perspiciatis vel omnis,
                commodi ab repellat provident est. Ipsam, labore! Corporis
                repellendus dolorum quibusdam! Minima, esse maiores.
              </p>
            </fieldset>
            <fieldset className={styles.filedset}>
                <legend className={styles.legend}>
                  FAME, FORTUNE AND THE FUTURE: TALKING WITH UZOMA ABRAHAM
                </legend>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente quisquam quam pariatur animi perspiciatis vel omnis,
                commodi ab repellat provident est. Ipsam, labore! Corporis
                repellendus dolorum quibusdam! Minima, esse maiores.
              </p>
            </fieldset>
            <fieldset className={styles.filedset}>
                <legend className={styles.legend}>
                  FAME, FORTUNE AND THE FUTURE: TALKING WITH UZOMA ABRAHAM
                </legend>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente quisquam quam pariatur animi perspiciatis vel omnis,
                commodi ab repellat provident est. Ipsam, labore! Corporis
                repellendus dolorum quibusdam! Minima, esse maiores.
              </p>
            </fieldset>
          </Box>
        </Flex>
        <Flex className={styles.gameplay}>
            <Text className={styles.gameplayTxt}>WE ARE LIFE BEYOND</Text>
          <Flex className={styles.gameVid}>
            <Box>
              <video
                autoPlay
                loop
                muted
                className={styles.video}
                src="https://zuraverse.xyz/wp-content/uploads/2023/08/Hack-Run-low.mp4"
              ></video>
            </Box>
            <Box>
              <Text className={styles.gamevidHeading}>
                An UNFORGETTABLE EXPERIANCE
              </Text>
              <Flex flexDir={"column"} gap={"20px"}>
                <span>
                  Welcome to Life Beyond, a unique gaming metaverse where your
                  journey begins with building a new civilization on Planet
                  Dolos.
                </span>
                <span>
                  In this dynamic sci-fi world, powered by a player-driven
                  tokenized economy, you can choose your path and role in the
                  intricate society of Life Beyond.
                </span>
                <span>
                  Created by Darewise Entertainment, a part of Animoca Brands,
                  the project upholds the open metaverse philosophy, offering
                  immersive experiences with a focus on true ownership and
                  interoperability.
                </span>
              </Flex>
              <Box h={"8vh"} pos={"relative"}>
                <ButtonComp title="LEARN TO PLAY" func={undefined} />
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Box className={styles.playSec}>
          <Flex
            letterSpacing={"1px"}
            w={"fit-content"}
            flexDir="column"
            justify={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"120px"}>IT'S TIME TO</Text>
              <Text fontSize={"140px"} className={styles.yellowTxt}>
                PLAY NOW
              </Text>

            <Box w={"100%"} left={"30%"} mt={"100px"} pos={"relative"}>
              <ButtonComp func={handlePlayGame} title="Play Now" />
            </Box>
          </Flex>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
