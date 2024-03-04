import { JSX } from "react";
import Head from "next/head";
import Loading from "@/components/partials/Loading";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useSingleEvent } from "@/hooks/useSingleEvent";
import { useEvents } from "@/hooks/useEvents";
import moment from "moment";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ id: string }>> => {
  const id = context.query.id as string;

  return {
    props: {
      id,
    },
  };
};

export default function EventDetails({ id }: { id: number }): JSX.Element {
  // fetch single post with custom hooks
  const { singleEvent, isLoading } = useSingleEvent(id);

  // console.log(singlePost.title);

  return (
    <>
      <Head>
        <title>{`SPAS | ${singleEvent.name}`}</title>
        <link rel="icon" href="/spas-logo.png" />
        <meta name="author" content="SPAS" />

        <meta name="title" content="Details" />

        <meta name="description" content="details" />

        <meta name="keywords" content="spa, services, details" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:title" content="details" />

        <meta property="og:description" content="Details" />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
        />
      </Head>

      <div className="pt-32">{isLoading && <Loading />}</div>
      {!isLoading && (
        <main>
          <header className="pb-5 lg:pb-24">
            <div className="container">
              <h2 className="mt-8 text-2xl lg:text-1xl font-bold text-black">
                Event Title : {singleEvent.name}
              </h2>
              <p className="mt-4 text-black">
                <span className="font-bold text-base">Description</span> :{" "}
                {singleEvent.description}
              </p>
              <p className="mt-4 text-black">
                <span className="font-bold">Event Dates</span> :{" "}
                {moment(singleEvent.start_date).format("dddd, D MMMM YYYY")} -{" "}
                {moment(singleEvent.end_date).format("dddd, D MMMM YYYY")}
              </p>
            </div>
          </header>
        </main>
      )}
    </>
  );
}
