import {
  Box,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/quests.module.css";
import TaskTab from "../components/TaskTab";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

const Quests = () => {
  const [dailyLoginCompleted, setDailyLoginCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [followOnTwitterCompleted, setFollowOnTwitterCompleted] =
    useState(false);
  const [connectDiscordCompleted, setConnectDiscordCompleted] = useState(false);
  const [followOnTelegramCompleted, setFollowOnTelegramCompleted] =
    useState(false);
  const [spendTimeCompleted, setSpendTimeCompleted] = useState(false);
  const [spendTimeRemaining, setSpendTimeRemaining] = useState(5 * 60 * 1000);
  const [points, setPoints] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const address = useAddress();

  useEffect(() => {
    const storedTime = localStorage.getItem("dailyLoginTime");
    if (storedTime) {
      const completionTime = parseInt(storedTime);
      const currentTime = Date.now();
      const nextDay = new Date(completionTime);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      const remainingTime = nextDay - currentTime;
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        setDailyLoginCompleted(true);
      }
    }

    const storedFollow = localStorage.getItem("followOnTwitterCompleted");
    if (storedFollow) {
      setFollowOnTwitterCompleted(storedFollow === "true");
    }

    const storedConnectDiscord = localStorage.getItem(
      "connectDiscordCompleted"
    );
    if (storedConnectDiscord) {
      setConnectDiscordCompleted(storedConnectDiscord === "true");
    }

    const storedFollowTelegram = localStorage.getItem(
      "followOnTelegramCompleted"
    );
    if (storedFollowTelegram) {
      setFollowOnTelegramCompleted(storedFollowTelegram === "true");
    }

    const storedSpendTime = localStorage.getItem("spendTimeCompleted");
    if (storedSpendTime) {
      setSpendTimeCompleted(storedSpendTime === "true");
    }

    const storedPoints = localStorage.getItem("points");
    if (storedPoints) {
      setPoints(parseInt(storedPoints));
    }

    const storedTasksCompleted = localStorage.getItem("tasksCompleted");
    if (storedTasksCompleted) {
      setTasksCompleted(parseInt(storedTasksCompleted));
    }

    const storedElapsedTime = localStorage.getItem("elapsedTime");
    if (storedElapsedTime) {
      startTimeRef.current = Date.now() - parseInt(storedElapsedTime);
      const elapsedTime = parseInt(storedElapsedTime);
      const remainingTime = 5 * 60 * 1000 - elapsedTime;
      setSpendTimeRemaining(remainingTime);
    } else {
      startTimeRef.current = Date.now();
    }

    if (!spendTimeCompleted && !isTaskCompletedToday("spendTime")) {
      startSpendTimeTimer();
    }

    return () => {
      clearInterval(timerRef.current);
      const elapsedTime = Date.now() - startTimeRef.current;
      localStorage.setItem("elapsedTime", elapsedTime.toString());
    };
  }, []);

  const startSpendTimeTimer = () => {
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      localStorage.setItem("elapsedTime", elapsedTime.toString());
      if (elapsedTime >= 5 * 60 * 1000) {
        completeTask("spendTime", 100);
        clearInterval(timerRef.current);
      } else {
        setSpendTimeRemaining(5 * 60 * 1000 - elapsedTime);
      }
    }, 1000);
  };

  const isTaskCompletedToday = (taskName) => {
    const lastCompletionDate = localStorage.getItem(
      `${taskName}CompletionDate`
    );
    if (lastCompletionDate) {
      const lastDate = new Date(parseInt(lastCompletionDate));
      const today = new Date();
      return (
        lastDate.getDate() === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear()
      );
    }
    return false;
  };

  useEffect(() => {
    let timer;
    if (dailyLoginCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            localStorage.removeItem("dailyLoginTime");
            setDailyLoginCompleted(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [dailyLoginCompleted, timeRemaining]);

  const handleDailyLogin = () => {
    completeTask("dailyLogin", 50);
  };

  const handleFollowOnTwitter = () => {
    window.open("https://twitter.com/Zuraverse", "_blank");
    completeTask("followOnTwitter", 100);
  };

  const handleConnectDiscord = () => {
    window.open(
      "https://discord.com/channels/960497893540786206/1158096674271531099",
      "_blank"
    );
    completeTask("connectDiscord", 100);
  };

  const handleFollowOnTelegram = () => {
    window.open("https://t.me/Zuraverse", "_blank");
    completeTask("followOnTelegram", 100);
  };

  const completeTask = (taskName, taskPoints) => {
    if (taskName === "dailyLogin") {
      setDailyLoginCompleted(true);
      const currentTime = Date.now();
      localStorage.setItem("dailyLoginTime", currentTime.toString());
      const nextDay = new Date(currentTime);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      const timeUntilNextDay = nextDay - currentTime;
      setTimeRemaining(timeUntilNextDay);
    } else if (taskName === "followOnTwitter") {
      setFollowOnTwitterCompleted(true);
      localStorage.setItem("followOnTwitterCompleted", "true");
    } else if (taskName === "connectDiscord") {
      setConnectDiscordCompleted(true);
      localStorage.setItem("connectDiscordCompleted", "true");
    } else if (taskName === "followOnTelegram") {
      setFollowOnTelegramCompleted(true);
      localStorage.setItem("followOnTelegramCompleted", "true");
    } else if (taskName === "spendTime") {
      setSpendTimeCompleted(true);
      localStorage.setItem("spendTimeCompleted", "true");
      localStorage.setItem("spendTimeCompletionDate", Date.now());
      clearInterval(timerRef.current);
      startSpendTimeTimer();
    }

    setPoints((prevPoints) => {
      const newPoints = prevPoints + taskPoints;
      localStorage.setItem("points", newPoints);
      return newPoints;
    });

    setTasksCompleted((prevTasksCompleted) => {
      const newTasksCompleted = prevTasksCompleted + 1;
      localStorage.setItem("tasksCompleted", newTasksCompleted);
      return newTasksCompleted;
    });
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  let tasksList = [
    {
      name: "Daily Login",
      points: 50,
      img: "https://png.pngtree.com/png-clipart/20240129/original/pngtree-3d-dollar-coin-silver-png-image_14177869.png",
      component: (
        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Box color={"grey"} lineHeight={"1px"}>
            {dailyLoginCompleted ? (
              "Completed"
            ) : (
              <Button
                color={"black"}
                onClick={handleDailyLogin}
                isDisabled={dailyLoginCompleted}
              >
                {"Complete Task"}
              </Button>
            )}
          </Box>
          {dailyLoginCompleted && <Text>{formatTime(timeRemaining)}</Text>}
        </Flex>
      ),
      isCompleted: dailyLoginCompleted,
    },
    {
      name: "Spend 5 minutes on Zuraverse",
      points: 100,
      img: "https://cdn-icons-png.flaticon.com/512/1599/1599276.png",
      component: (
        <Flex flexDirection="column" alignItems="center" gap={2}>
          {spendTimeCompleted ? (
            <Text color={"green"}>Completed</Text>
          ) : (
            <Text>{formatTime(spendTimeRemaining)}</Text>
          )}
        </Flex>
      ),
      isCompleted: spendTimeCompleted,
    },
    {
      name: "Follow On Twitter",
      points: 100,
      img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-icon.png",
      component: (
        <Flex flexDirection="column" alignItems="center" gap={2}>
          {followOnTwitterCompleted ? (
            <Text color={"grey"}>{"Completed"}</Text>
          ) : (
            <Button
              color={"black"}
              onClick={handleFollowOnTwitter}
              isDisabled={followOnTwitterCompleted}
            >
              {"Complete Task"}
            </Button>
          )}
        </Flex>
      ),
      isCompleted: followOnTwitterCompleted,
    },
    {
      name: "Connect Discord",
      points: 100,
      img: "https://static.vecteezy.com/system/resources/previews/023/741/168/original/discord-logo-icon-social-media-icon-free-png.png",
      component: (
        <Flex flexDirection="column" alignItems="center" gap={2}>
          {connectDiscordCompleted ? (
            <Text color="grey">{"Completed"}</Text>
          ) : (
            <Button
              color={"black"}
              onClick={handleConnectDiscord}
              isDisabled={connectDiscordCompleted}
            >
              {"Complete Task"}
            </Button>
          )}
        </Flex>
      ),
      isCompleted: connectDiscordCompleted,
    },
    {
      name: "Follow Zuraverse on Telegram",
      points: 100,
      img: "https://static-00.iconduck.com/assets.00/telegram-icon-2048x2048-ctlhfvgw.png",
      component: (
        <Flex flexDirection="column" alignItems="center" gap={2}>
          {followOnTelegramCompleted ? (
            <Text color="grey">{"Completed"}</Text>
          ) : (
            <Button
              color={"black"}
              onClick={handleFollowOnTelegram}
              isDisabled={followOnTelegramCompleted}
            >
              {"Complete Task"}
            </Button>
          )}
        </Flex>
      ),
      isCompleted: followOnTelegramCompleted,
    },
  ];

  const [usersData, setUsers] = useState(null);

  const fetchUsers = async () => {
    const accesskey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhZ2FyIiwiaWF0IjoxNTE2MjM5MDIyfQ.wxsqzkXqzM734Hn7VIucUWFXRFs4hM7qaqi1t0qi_nI";

    try {
      const response = await axios.get("/api/profile/users", {
        headers: {
          accesskey: accesskey,
        },
      });
      return setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.main}>
        <Box className={styles.banner}>
          <Image
            width="100%"
            height="100%"
            src="https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?width=1080&crop=smart&auto=webp&s=e4d4877f91a0122d4b1a380a39d755b43558bcc9"
            alt="carousel image"
          />
          <Box className={styles.taskTrackBox}>
            <Flex flexGrow={1} gap={4} alignItems={"center"}>
              <Box
                w={"60px"}
                h={"fit-content"}
                borderRadius={"50%"}
                overflow={"hidden"}
              >
                <Image
                  width="100%"
                  height="100%"
                  src="https://api.dicebear.com/8.x/bottts-neutral/svg?seed=0x6c3a72f136c6c05080c2f42440758eb45ee00e11"
                  alt="carousel image"
                />
              </Box>
              <Text>Wallet Address</Text>
            </Flex>
            <Flex flexDir={"column"} flexGrow={1} gap={2} alignItems={"center"}>
              <Flex
                align={"center"}
                justifyContent={"space-between"}
                w={"100%"}
                mt={4}
              >
                <Text>Task Completed</Text>
                <Text fontSize={"24px"}>{tasksCompleted}/5</Text>
              </Flex>
              <Flex
                align={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text>Points Earned</Text>
                <Text fontSize={"24px"}>{points}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box className={styles.dailyTask}>
          <Box>
            <Text className={styles.heading}>Today Task</Text>
            <Text color={"grey"}>No Task Today, Comeback Tommarow</Text>
          </Box>
        </Box>
        <Box className={styles.taskCont}>
          <Box className={styles.tasks}>
            <Text fontStyle={"italic"} fontSize={"34px"}>
              TASKS
            </Text>
            <Box mt={2}>
              {tasksList.map((e, index) => (
                <Box key={index} className={styles.taskItem}>
                  <TaskTab data={e} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box pos={"relative"} className={styles.leaderboard}>
            <Text fontStyle={"italic"} fontSize={"34px"}>
              LEADERBOARD
            </Text>
            <Box className={styles.participants} overflowX="auto">
              <Table variant="simple" border="none" width="100%">
                <Thead>
                  <Tr color={"white"} border="none">
                    <Th border="none">VIEW</Th>
                    <Th border="none">#</Th>
                    <Th border="none">USER</Th>
                    <Th border="none">POINTS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usersData &&
                    usersData.map((participant, index) => (
                      <Tr
                        key={participant.id}
                        bg={index % 2 === 0 ? "#282829" : "transparent"}
                        border="none"
                      >
                        <Td border={"none"}>👀</Td>
                        <Td border={"none"}>{index + 1}</Td>
                        <Td border={"none"}>{`${
                          participant.userName || "N/A"
                        }`}</Td>
                        <Td border={"none"}>{participant.karmabalance}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
            {address && (
              <Box
                w={"100%"}
                left={0}
                bottom={1}
                bg={"#F205C7"}
                h={"7vh"}
                pos={"absolute"}
                borderRadius={"5px"}
                textAlign={"center"}
                fontSize={"30px"}
              >
                your #Rank is here
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quests;
