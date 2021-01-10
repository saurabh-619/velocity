import Head from "next/head";
import { useAuth } from "@/lib/auth";

import { Button, Heading, Text, Box, Flex } from "@chakra-ui/react";
import { LogoIcon, GoogleIcon, GithubIcon } from "./../styles/icons";

export default function Home() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      justify="center"
      align="center"
      w="full"
      h="100vh"
    >
      <Head>
        <title>Velocity</title>
      </Head>
      <Heading>Velocity</Heading>
      <LogoIcon fontSize={50} color="black" />
      {auth?.user ? (
        <Button mt={4} size="sm" onClick={() => auth.signout()}>
          Sign out
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signInWithGithub()}>
          Sign in with Github
        </Button>
      )}
      <Text>{auth?.user?.email}</Text>
    </Flex>
  );
}
