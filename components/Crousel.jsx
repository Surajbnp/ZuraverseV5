import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/crousel.module.css";
import ButtonComp from "./ButtonComp";

const Crousel = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [progress, setProgress] = useState(0);

  const images = [
    {
      url: "https://playlifebeyond.com/img/assets/hub/slider/slider_bots-launch.jpg",
      heading: "DISCORD COMMUNITY",
      subheading:
        "Get you new shiny watch in exchange for your old Founder Key. This watch will be unique, and will be used to unlock exclusive content in the future.",
    },
    {
      url: "https://playlifebeyond.com/img/assets/hub/slider/slider_the-lore.jpg",
      heading: "THE LORE OF LIFE BEYOND",
      subheading:
        "Meet passionate Life Beyond players, discuss the latest updates, share tips and discover exclusive events.",
    },
    {
      url: "https://playlifebeyond.com/img/assets/hub/slider/slider_origin-collection.png",
      heading: "Zura House",
      subheading:
        "Meet passionate Life Beyond players, discuss the latest updates, share tips and discover exclusive events.",
    },
    {
      url: "https://playlifebeyond.com/img/assets/hub/slider/slider_community.jpg",
      heading: "Zura House",
      subheading:
        "Meet passionate Life Beyond players, discuss the latest updates, share tips and discover exclusive events.",
    },
    {
      url: "https://playlifebeyond.com/img/assets/hub/slider/slider_founder-watch.jpg",
      heading: "Zura House",
      subheading:
        "Meet passionate Life Beyond players, discuss the latest updates, share tips and discover exclusive events.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImg((prevImg) => (prevImg + 1) % images.length);
          return 0;
        }
        return prev + 1;
      });
    }, 30); // Adjust the time interval for progress speed

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <Box className={styles.container} position="relative">
      <Box position="relative" height="70vh">
        <Image
          width="100%"
          height="100%"
          src={images[currentImg].url}
          alt="carousel image"
        />
        <Box
          position="absolute"
          bottom="100px"
          left="40px"
          color="white"
          background="none"
          textAlign={"start"}
          width={"400px"}
          height={"fit-content"}
        >
          <Text fontSize="40px" fontWeight="bold" mb={4}>
            {images[currentImg].heading}
          </Text>
          <Text mb={"100px"} fontSize="18px">
            {images[currentImg].subheading}
          </Text>
          <Box pos={"relative"}>
            <ButtonComp title="Join Us" />
          </Box>
        </Box>
      </Box>

      <Box p={2} display="flex" justifyContent="center" mt={4}>
        {images.map((image, index) => (
          <Box
            key={index}
            m={2}
            onClick={() => setCurrentImg(index)}
            cursor="pointer"
            border={"1px solid #404040 "}
            position="relative"
            width="100%"
            height="100px"
            flexGrow={1}
          >
            <Image
              src={image.url}
              alt={`thumbnail ${index}`}
              boxSize="100%"
              objectFit="cover"
            />
            {currentImg === index && (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width={`${progress}%`}
                backgroundColor="rgba(255, 255, 255, 0.3)"
                backdropFilter="blur(1px)"
                transition="width 0.1s linear"
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Crousel;
