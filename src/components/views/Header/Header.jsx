import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
  Heading,
  HStack,
  IconButton,
  Collapse,
  Hide,
  Switch,
  FormControl,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [display, setDisplay] = useState(false);
  const [tasksCount] = useState(localStorage.getItem("token"));

  useEffect(() => {}, [tasksCount]);

  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const logOutColor = useColorModeValue(
    { bg: "none", color: "font" },
    { bg: "none", color: "button" }
  );
  const buttonHoverColor = useColorModeValue(
    {
      bg: "white",
      color: "primary",
      border: "1px",
    },
    {
      bg: "bgDark",
      color: "primary",
      border: "1px",
    }
  );

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleMenuClick = () => {
    setDisplay(!display);
  };

  const isDarkMode = () => {
    return colorMode !== "light";
  };

  return (
    <>
      <Stack
        height="50px"
        align="center"
        justify="space-between"
        direction="row"
        p={4}
        borderBottomWidth="medium"
      >
        <HStack spacing={0}>
          <Heading color="primary" fontFamily="Poppins" fontSize="30px">
            Go
          </Heading>
          <Text fontSize="20px" fontFamily="logo" fontWeight="500" pt={1.5}>
            Scrum
          </Text>
        </HStack>
        <Stack
          direction="row"
          align="center"
          justify="center"
          gap={2}
          display={{ base: "none", md: "flex" }}
        >
          <Button
            height="22px"
            width="70px"
            color="white"
            bg="primary"
            _hover={buttonHoverColor}
            _active={{
              bg: "white",
              color: "primary",
              border: "1px",
            }}
            // _pressed={{
            //   bg: "white",
            //   color: "primary",
            //   border: "1px",
            // }}
          >
            Donar
          </Button>
          <Text>Tareas creadas: {localStorage.getItem("tasks")}</Text>
          <Text>{localStorage.getItem("username")}</Text>
          <Switch
            onChange={toggleColorMode}
            isChecked={isDarkMode()}
            colorScheme=""
            size="md"
            style={{
              "--switch-track-width": "40px",
            }}
            css={`
              span[data-focus] {
                box-shadow: none !important;
              }
              *[data-focus] {
                box-shadow: none !important;
              }
              *:active {
                background-color: none !important;
              }
            `}
          >
            <MoonIcon
              color="white"
              display={colorMode === "light" ? "none" : "block"}
              position="absolute"
              top={0.5}
              right={8}
              // css={``}
              pointerEvents="none"
            />
            <SunIcon
              color="yellow"
              display={colorMode !== "light" ? "none" : "block"}
              position="absolute"
              top={0.5}
              left={6}
              pointerEvents="none"
            />
          </Switch>
          <Button
            onClick={() => logOut()}
            size="xs"
            fontSize="lg"
            bg="transparent"
            color="primary"
            _hover={logOutColor}
          >
            x
          </Button>
        </Stack>

        <IconButton
          aria-label="open menu"
          size="md"
          mr={2}
          bg="none"
          _hover={{ bg: "none" }}
          _pressed={{ border: "none" }}
          icon={!display ? <HamburgerIcon /> : <CloseIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={handleMenuClick}
        />
      </Stack>
      <Collapse in={display}>
        <Hide above="md">
          <Stack
            w="100vw"
            h="25vh"
            zIndex={20}
            direction="column"
            bg={useColorModeValue("bg", "bgDark")}
          >
            <Stack direction="column" spacing={1.5} align="center" py={3}>
              <Button
                height="22px"
                width="70px"
                color="white"
                bg="primary"
                _hover={{
                  bg: "white",
                  color: "primary",
                  border: "1px",
                }}
              >
                Donar
              </Button>
              <Text>Tareas creadas: {localStorage.getItem("tasks")}</Text>
              <Text>{localStorage.getItem("username")}</Text>
              <FormControl width="44px">
                <Switch
                  colorScheme=""
                  size="md"
                  style={{
                    "--switch-track-width": "40px",
                  }}
                  onChange={toggleColorMode}
                  isChecked={isDarkMode()}
                  css={`
                    span[data-focus] {
                      box-shadow: none !important;
                    }
                    *[data-focus] {
                      box-shadow: none !important;
                    }
                    label.chakra-switch {
                      display: none;
                    }
                  `}
                ></Switch>
                <MoonIcon
                  color="white"
                  display={colorMode === "light" ? "none" : "block"}
                  position="absolute"
                  top={1.5}
                  right={6}
                  pointerEvents="none"
                />
                <SunIcon
                  color="yellow"
                  display={colorMode !== "light" ? "none" : "block"}
                  position="absolute"
                  top={1.5}
                  left={6}
                  pointerEvents="none"
                />
              </FormControl>
              <Button
                onClick={() => logOut()}
                size="xs"
                fontSize="lg"
                bg="transparent"
                color="primary"
                _hover={logOutColor}
              >
                x
              </Button>
            </Stack>
          </Stack>
        </Hide>
      </Collapse>
    </>
  );
};

export default Header;
