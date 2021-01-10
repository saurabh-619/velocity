import React from "react";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

const FreePlanEmptyState = ({ children }) => {
  const { user } = useAuth();

  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        There isn't any feedback.
      </Heading>
      <Text mb={4}>Share your sites!</Text>
    </Flex>
  );
};
export default FreePlanEmptyState;
