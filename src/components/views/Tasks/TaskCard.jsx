import { Stack, Button, Text, Flex } from "@chakra-ui/react";

const TaskCard = ({
  data: {
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  }
}) => {
  const statusButtonColor = () => {
    if (status === "NEW") {
      return "primary";
    } else if (status === "IN PROGRESS") {
      return "secondary";
    } else if (status === "FINISHED") {
      return "tertiary";
    }
  };

  const importanceButtonColor = () => {
    if (importance === "LOW") {
      return "primary";
    } else if (importance === "MEDIUM") {
      return "secondary";
    } else if (importance === "HIGH") {
      return "tertiary";
    }
  };

  return (
    <Stack
      width={{ base: "100%", xl: "200px", '2xl': "300px" }}
      minHeight="130px"
      justify="space-between"
      direction="row"
      p={3}
      border="1px solid #C4C4C4"
      borderRadius="xl"
    >
      <Flex direction="column" border="1px solid cardBorder">
        <Text mt={0} fontSize="md" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="xs">
          {new Date(createdAt).toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
          })}
        </Text>
        <Text fontSize="xs" mb={1}>
          {userName}
        </Text>
        <Stack direction="row">
          <Button
            fontSize="xs"
            height="16px"
            p={1}
            color="button"
            bg={statusButtonColor()}
            _hover={{
              bg: "button",
              color: statusButtonColor(),
              border: "1px",
            }}
          >
            {status.toLowerCase()}
          </Button>
          <Button
            fontSize="xs"
            height="16px"
            p={1}
            color="button"
            bg={importanceButtonColor()}
            _hover={{
              bg: "button",
              color: importanceButtonColor(),
              border: "1px",
            }}
          >
            {importance.toLowerCase()}
          </Button>
        </Stack>
        <Text fontSize="xs">{description}</Text>
      </Flex>
      <Stack>
        <Button size="xs" bg="cardBg" _hover={{ bg: "cardBg" }}>
          X
        </Button>
      </Stack>
    </Stack>
  );
};

export default TaskCard;
