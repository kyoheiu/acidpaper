import ArticleElement from "./ArticleElement";
import { Category, ElementKind, WrappedData } from "../types/types";
import { FooterImage } from "@/components/Footer";
import Link from "next/link";
import {
  RiHome2Fill,
  RiHeart2Fill,
  RiInboxArchiveFill,
  RiHashtag,
  RiSearch2Fill,
} from "react-icons/ri";
import { ReactNode } from "react";

export const Main = (
  c: Category,
  wrapped: WrappedData[],
  children?: JSX.Element,
  tagName?: string,
  query?: string | string[]
) => {
  const Menu = ({ children }: { children: ReactNode }) => {
    return (
      <div className="mb-6 mt-6 flex h-8 items-center justify-evenly rounded-full border border-slate-500 py-2">
        {children}
      </div>
    );
  };

  const LinkedHome = () => {
    return (
      <Link href="/" className="text-sm">
        <RiHome2Fill />
      </Link>
    );
  };

  const LinkedLiked = () => {
    return (
      <Link href="/liked" className="text-sm">
        <RiHeart2Fill />
      </Link>
    );
  };

  const LinkedArchived = () => {
    return (
      <Link href="/archived" className="text-sm">
        <RiInboxArchiveFill />
      </Link>
    );
  };

  const DivMenu = ({ children }: { children: ReactNode }) => {
    return <div className="border-b border-slate-900 text-sm">{children}</div>;
  };

  switch (c) {
    case Category.All:
      return (
        <>
          <Menu
            children={
              <>
                <DivMenu children={<RiHome2Fill />} />
                <LinkedLiked />
                <LinkedArchived />
              </>
            }
          />
          <div className="mt-3">
            {wrapped.map((e, index) => {
              return (
                <ArticleElement
                  key={`index-element${index}`}
                  element={e}
                  kind={ElementKind.Top}
                />
              );
            })}
            {children}
          </div>
        </>
      );
    case Category.Liked:
      return (
        <>
          <Menu
            children={
              <>
                <LinkedHome />
                <DivMenu children={<RiHeart2Fill />} />
                <LinkedArchived />
              </>
            }
          />
          <div className="mt-3">
            {wrapped.map((e, index) => {
              return (
                <ArticleElement
                  key={`liked-element${index}`}
                  element={e}
                  kind={ElementKind.Liked}
                />
              );
            })}
            {children}
          </div>
        </>
      );
    case Category.Archived:
      return (
        <>
          <Menu
            children={
              <>
                <LinkedHome />
                <LinkedLiked />
                <DivMenu children={<RiInboxArchiveFill />} />
              </>
            }
          />
          <div className="mt-3">
            {wrapped.map((e, index) => {
              return (
                <ArticleElement
                  key={`archived-element${index}`}
                  element={e}
                  kind={ElementKind.Archived}
                />
              );
            })}
            {children}
          </div>
        </>
      );
    case Category.Tagged:
      return (
        <>
          <Menu
            children={
              <>
                <LinkedHome />
                <DivMenu
                  children={
                    <>
                      <RiHashtag className="inline-block" />
                      &nbsp;{tagName}
                    </>
                  }
                />
              </>
            }
          />
          <div className="mt-3">
            {wrapped.map((e, index) => {
              return (
                <ArticleElement
                  key={`tagged-element${index}`}
                  element={e}
                  kind={ElementKind.Searched}
                />
              );
            })}
            {children}
          </div>
        </>
      );
    case Category.Searched:
      return (
        <>
          <Menu
            children={
              <>
                <LinkedHome />
                <DivMenu
                  children={
                    <>
                      <RiSearch2Fill className="inline-block" />
                      &nbsp;{query}
                    </>
                  }
                />
              </>
            }
          />
          <div className="mt-3">
            {wrapped.map((e, index) => {
              return (
                <ArticleElement
                  key={`searched-element${index}`}
                  element={e}
                  kind={ElementKind.Searched}
                />
              );
            })}
            {FooterImage()}
          </div>
        </>
      );
  }
};
