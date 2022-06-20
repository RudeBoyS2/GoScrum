import React from "react";
import Header from "../Header/Header";
import Tasks from "../../Tasks/Tasks";
import { Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Container
      height="100%"
      maxW="100%"
      padding={0}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <Tasks />
    </Container>
  );
};

export default Home;
