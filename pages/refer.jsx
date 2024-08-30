import {
  Box,
  Flex,
  Input,
  Button,
  useToast,
  useClipboard,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/refer.module.css";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { FaCopy, FaCheck } from "react-icons/fa";

const Refer = () => {
  const [userData, setData] = useState(null);
  const [referralLink, setReferralLink] = useState("");
  const address = useAddress();
  const toast = useToast();
  const { onCopy } = useClipboard(referralLink);
  const [showCopied, setShowCopied] = useState(false);

  const generateReferralLink = (id) => {
    const url = window.location.origin;
    const link = `${url}/refer?referid=${id}`;
    setReferralLink(link);
  };

  const fetchId = async () => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          zurawallet: address,
        },
      });
      setData(response?.data);
      generateReferralLink(response?.data?._id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    if (address) fetchId();
  }, []);

  const handleCopy = () => {
    onCopy();
    setShowCopied(true);
    toast({
      title: "Referral link copied.",
      description: "The referral link has been copied to your clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  };

  const dummyData = [
    { id: 1, wallet: "0x123...abc", points: 100 },
    { id: 2, wallet: "0x456...def", points: 200 },
    { id: 3, wallet: "0x789...ghi", points: 300 },
    { id: 4, wallet: "0x123...abc", points: 100 },
    { id: 5, wallet: "0x456...def", points: 200 },
    { id: 6, wallet: "0x789...ghi", points: 300 },
  ];

  // console.log(userData);

  return (
    <Box className={styles.cont}>
      <Box className={styles.main}>
        <Flex p={8} color={"white"} direction={"column"}>
          <label style={{ fontWeight: 600 }}>Refer Id</label>
          <Flex mt={2} alignItems="center">
            <Input
              border={"1px solid grey"}
              width={"100%"}
              type="text"
              value={referralLink}
              isReadOnly
            />
            <Button
              ml={2}
              onClick={handleCopy}
              leftIcon={showCopied ? <FaCheck /> : <FaCopy />}
              bg={showCopied ? "green.400" : null}
              color={showCopied ? "white" : null}
            >
              {showCopied ? "Copied" : "Copy"}
            </Button>
          </Flex>
          <Box
            className={styles.tableCont}
            mt={8}
            overflowY="scroll"
            maxHeight="200px"
          >
            <Table variant="simple" colorScheme="whiteAlpha">
              <Thead>
                <Tr background={"#003060"} color={"white"}>
                  <Th color={"white"}>S.No.</Th>
                  <Th color={"white"}>Wallet Address</Th>
                  <Th color={"white"}>Points Earned</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dummyData.map((item, index) => (
                  <Tr
                    key={item.id}
                    bg={index % 2 === 0 ? "gray.600" : "transparent"}
                  >
                    <Td>{item.id}</Td>
                    <Td>{item.wallet}</Td>
                    <Td>{item.points}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Refer;
