import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Raffle Contract </title>
        <meta name="description" content="Our raffle contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  );
};

export default Home;
