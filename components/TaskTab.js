import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const TaskTab = ({ data }) => {
  return (
    <Box
      width={"100%"}
      height={"12vh"}
      border={"1px solid #404040"}
      borderRadius={"15px"}
      p={"14px"}
      display={"flex"}
      justifyContent={"space-between"}
      boxSizing="border-box"
      mb={"20px"}
      filter={data.isCompleted ? "grayscale(100%)" : "none"}
    >
      <Flex alignItems={"center"} gap={"20px"}>
        <Flex
          border={"1px solid #404040"}
          width={"110px"}
          height={"90%"}
          borderRadius={"10px"}
          alignItems={"center"}
          justify={"center"}
        >
          <Image w={"60px"} h={"60px"} src={data.img} alt="banner" />
        </Flex>
        <Text fontSize={"24px"}>{data.name}</Text>
      </Flex>
      <Flex alignItems={"center"} gap={"20px"}>
        <Text
          color={"#FC2AEC"}
          fontStyle={"italic"}
          fontSize={"40px"}
        >{`+${data.points}`}</Text>
        {data.component}
      </Flex>
    </Box>
  );
};

export default TaskTab;
