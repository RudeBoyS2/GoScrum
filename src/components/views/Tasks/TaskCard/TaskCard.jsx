import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, editCardStatus } from "../TasksSlice";
import { Stack, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const TaskCard = ({
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditCardStatus = (data) => dispatch(editCardStatus(data));

  const limitString = (string) => {
    if (string.length > 150) {
      return { string: string.slice(0, 147).concat("..."), addButton: true };
    } else {
      return { string: string, addButton: false };
    }
  };

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

  const statusButtonHoverColor = useColorModeValue(
    {
      bg: "white",
      color: statusButtonColor(),
      border: "1px",
    },
    {
      bg: "bgDark",
      color: statusButtonColor(),
      border: "1px",
    }
  );

  const importanceButtonHoverColor = useColorModeValue(
    {
      bg: "white",
      color: importanceButtonColor(),
      border: "1px",
    },
    {
      bg: "bgDark",
      color: importanceButtonColor(),
      border: "1px",
    }
  );

  return (
    <Stack
      width={{ base: "100%", xl: "200px", "2xl": "300px" }}
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
            onClick={() => handleEditCardStatus(data)}
            fontSize="xs"
            height="16px"
            p={1}
            color="button"
            bg={statusButtonColor()}
            _hover={statusButtonHoverColor}
            _active={{
              bg: "white",
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
            _hover={importanceButtonHoverColor}
            _active={{
              bg: "white",
              color: importanceButtonColor(),
              border: "1px",
            }}
          >
            {importance.toLowerCase()}
          </Button>
        </Stack>
        {!showMore && (
          <Text fontSize="xs">{limitString(description).string}</Text>
        )}
        {showMore && (
          <>
            <Text fontSize="xs">{description}</Text>
            <Button
              onClick={() => setShowMore(false)}
              color="button"
              bg="primary"
              fontSize="xs"
              height="16px"
              width="70px"
              _hover={{
                bg: "button",
                color: "primary",
                border: "1px",
              }}
            >
              Ver menos
            </Button>
          </>
        )}
        {!showMore && limitString(description).addButton && (
          <Button
            onClick={() => setShowMore(true)}
            color="button"
            bg="primary"
            fontSize="xs"
            height="16px"
            width="70px"
            _hover={{
              bg: "button",
              color: "primary",
              border: "1px",
            }}
          >
            Ver más
          </Button>
        )}
      </Flex>
      <Stack>
        <Button
          onClick={() => handleDelete(_id)}
          // onClick={() => {
          //   handleDelete(_id);
          //   onDeleteCallback();
          // }}
          size="xs"
          bg="none"
          _hover={{ bg: "none" }}
        >
          X
        </Button>
      </Stack>
    </Stack>
  );
};

export default TaskCard;
