import type { NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { fetchQuery } from "react-relay";

import type { IssuesQuery } from "../__generated__/IssuesQuery.graphql";
import IssuesQueryDocument from "../graphql/IssuesQuery";
import { initEnvironment, dehydrateStore } from "../lib/relay";
import styles from "../styles/Home.module.css";

const SSR: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  issues,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          {issues?.edges?.map((edge) => (
            <a
              href={edge?.node?.url}
              key={edge?.node?.number}
              className={styles.card}
            >
              <h2>Issue {edge?.node?.number}</h2>
              <p>{edge?.node?.title}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default SSR;

export const getServerSideProps = async () => {
  const environment = initEnvironment();

  const result = await fetchQuery<IssuesQuery>(
    environment,
    IssuesQueryDocument,
    {
      owner: "vercel",
      name: "next.js",
      first: 4,
    }
  ).toPromise();

  return {
    props: {
      initialRecords: dehydrateStore(environment),
      issues: result?.repository?.issues,
    },
  };
};
