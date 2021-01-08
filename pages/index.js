import Head from "next/head";
import { useAuth } from "../lib/auth";

import { Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Velocity</title>
      </Head>
      <div>
        <Heading>Velocity</Heading>
        <Button onClick={(e) => auth.signInWithGithub()}>
          Sign in with Github
        </Button>
        {auth?.user && (
          <Button onClick={(e) => auth.signout()}>Sign out</Button>
        )}
        <Text>{auth?.user?.email}</Text>
      </div>
    </>
  );
}
