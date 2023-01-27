import { ElementProps, ElementKind } from "../types/types";
import { useState } from "react";
import Tags from "./Tags";

export default function ArticleElement(props: ElementProps) {
  const [article, setArticle] = useState(props.element);

  const kind = props.kind;

  const toggle_like = async () => {
    const target =
      "http://localhost:8000/articles/" + article.data.id + "?toggle=liked";
    const res = await fetch(target, { method: "POST" });
    if (!res.ok) {
      console.log("Cannot toggle like.");
    }

    if (kind === ElementKind.Liked) {
      setArticle((x) => ({
        visible: false,
        data: {
          ...x.data,
          liked: !x.data.liked,
        },
      }));
    } else {
      setArticle((x) => ({
        visible: x.visible,
        data: {
          ...x.data,
          liked: !x.data.liked,
        },
      }));
    }
  };

  const archive = async () => {
    const target =
      "http://localhost:8000/articles/" + article.data.id + "?toggle=archived";
    const res = await fetch(target, { method: "POST" });
    if (!res.ok) {
      console.log("Cannot archive article.");
    }

    if (kind === ElementKind.Archived) {
      setArticle((x) => ({
        visible: false,
        data: {
          ...x.data,
          archived: !x.data.archived,
        },
      }));
    } else {
      setArticle((x) => ({
        visible: x.visible,
        data: {
          ...x.data,
          archived: !x.data.archived,
        },
      }));
    }
  };

  const delete_article = async () => {
    const target = "http://localhost:8000/articles/" + article.data.id;
    const res = await fetch(target, { method: "DELETE" });
    if (!res.ok) {
      console.log("Cannot delete article.");
    }
    setArticle((x) => ({
      ...x,
      visible: false,
    }));
  };

  const add_tag = async (e) => {
    e.preventDefault();
    const element = document.getElementById(article.data.id + "_add_tag");
    const tag = element!.value;
    console.log(tag);
    const target =
      "http://localhost:8000/articles/" + article.data.id + "?kind=add";
    const res = await fetch(target, {
      method: "POST",
      body: tag,
    });
    if (!res.ok) {
      console.log("Cannot add tag.");
    }
    setArticle((x) => ({
      ...x,
      data: {
        ...x.data,
        tags: [...x.data.tags, tag],
      },
    }));
    element!.value = "";
  };

  const delete_tag = async (e) => {
    e.preventDefault();
    const tag = document.getElementById(
      article.data.id + "_delete_tag"
    )!.innerHTML;
    console.log(tag);
    const target =
      "http://localhost:8000/articles/" + article.data.id + "?kind=delete";
    const res = await fetch(target, {
      method: "POST",
      body: tag,
    });
    if (!res.ok) {
      console.log("Cannot delete tag.");
    }
    const updated = article.data.tags.filter((x) => x !== tag);
    setArticle((x) => ({
      ...x,
      data: {
        ...x.data,
        tags: updated,
      },
    }));
  };

  if ((kind === ElementKind.Top && article.data.archived) || !article.visible) {
    return <></>;
  }

  if (
    (kind === ElementKind.Archived ||
      kind === ElementKind.Liked ||
      kind === ElementKind.Searched) &&
    !article.visible
  ) {
    return <></>;
  }

  return (
    <li id={article.data.id}>
      <div className="timestamp">{article.data.timestamp}</div>
      <div className="title">
        <a href={"/articles/" + article.data.id}>{article.data.title}</a>
      </div>
      <div className="beginning">{article.data.beginning}</div>
      <button id={article.data.id} onClick={toggle_like}>
        {article.data.liked ? "unlike" : "like"}
      </button>
      <button id={article.data.id} onClick={archive}>
        {article.data.archived ? "unarchive" : "archive"}
      </button>
      <button id={article.data.id} onClick={delete_article}>
        "delete"
      </button>
      <div>
        {article.data.tags.map((x) => {
          {
            return (
              <>
                <form>
                  <a href={"/tags/" + x}>
                    <code id={article.data.id + "_delete_tag"}>{x}</code>
                  </a>
                  <button onClick={(e) => delete_tag(e)}>x</button>&nbsp;
                </form>
              </>
            );
          }
        })}
      </div>
      <Tags tags={article.data.tags} />
      <form>
        <input id={article.data.id + "_add_tag"} type="text" />
        <button onClick={(e) => add_tag(e)}>add tag</button>
      </form>
    </li>
  );
}
