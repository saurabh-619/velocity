import Head from "next/head";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Velocity</title>
      </Head>
      <div className={styles.container}>
        <h1>Velocity</h1>
        <button onClick={(e) => auth.signInWithGithub()}>
          Sign in with Github
        </button>
        {auth?.user && (
          <button onClick={(e) => auth.signout()}>Sign out</button>
        )}
        <div>{auth?.user?.email}</div>
      </div>
    </>
  );
}
