import NewQuizForm from "@/components/NewQuizForm";
import Quiz from "@/components/Quiz";
import useQuizStore from "@/store/useQuizStore";
import Head from "next/head";
import styles from "./index.module.css";

export default function Home() {
  const { isPlaying } = useQuizStore();

  return (
    <>
      <Head>
        <title>Birdlet</title>
        <meta name="description" content="Quizlet for birding" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Birdlet</h1>
        {isPlaying ? <Quiz /> : <NewQuizForm />}
      </main>
    </>
  );
}
