import { ArticleContent } from "../../types/types";
import { Header } from "../../components/Header";
import ArticleElement from "../../components/ArticleElement";
import useSWR, { Fetcher } from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import { cachedDataVersionTag } from "v8";
import sanitizeHtml from "sanitize-html";

type Data = ArticleContent;

export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async (context) => {
  if (context.params) {
    const id = context.params.id;
    const target = "http://127.0.0.1:8000/articles/" + id;
    const res = await fetch(target);
    const data = await res.json();
    return { props: { data } };
  } else {
    return { props: { data: [] } };
  }
};

export default function Searched({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const getScrollPosition = () => {
    const bodyheight = document.documentElement.scrollHeight;
    const scrolled = document.documentElement.scrollTop;
    const client = document.documentElement.clientHeight;
    const pos = Math.round((scrolled * 100) / bodyheight);
    const prog = Math.abs(bodyheight - client - scrolled);
    if (prog < 1) {
      return { pos: pos, prog: 100 };
    } else {
      return { pos: pos, prog: 100 - Math.round((prog * 100) / bodyheight) };
    }
  };

  const fetch_pos = () => {
    const n = getScrollPosition();
    console.log("pos: " + n.pos + " prog: " + n.prog);
    const target =
      "http://localhost:8000/articles/" +
      data.id +
      "?pos=" +
      n.pos +
      "&prog=" +
      n.prog;
    fetch(target, { method: "POST" }).then((res) => {
      if (!res.ok) {
        console.error("Cannot update progress.");
      }
    });
  };

  useEffect(() => {
    const scroll = Math.round(
      (document.documentElement.scrollHeight * data.position) / 100
    );
    console.log(data.position);
    globalThis.scrollTo(0, scroll);
  }, []);

  useEffect(() => globalThis.addEventListener("scroll", fetch_pos), []);

  if (!data) {
    return <h1>No article found.</h1>;
  }

  const cleaned = sanitizeHtml(data.html);

  return (
    <>
      <div className="title">{data.title}</div>
      <div dangerouslySetInnerHTML={{ __html: cleaned }}></div>
    </>
  );
}
