import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { Box, Text } from "@chakra-ui/react";
import { ConnectEmbed, useAddress } from "@thirdweb-dev/react";

const Register = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const address = useAddress();

  const handleConnect = () => {
    if (address) {
      setWalletAddress(address);
    }
    axios.get("/api/user");
  };

  return (
    <Box className={styles.cont}>
      <Box></Box>
      <Box>
        <Box>
          <Box>
            <ConnectEmbed style={{ width: "400px", border: "none" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
