import React from "react";
import Header from "../Header/Header";
import Tasks from "../../Tasks/Tasks";
import { Container } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container height="100%" maxW="100%" padding={0}>
      <Header />
      <Tasks />
    </Container>
  );
};

export default Home;
