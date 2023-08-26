use std::str::FromStr;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct Articles {
    pub data: Vec<ArticleData>,
    pub is_last: bool,
}

#[derive(Debug, Deserialize)]
pub struct ArticleScraped {
    pub url: String,
    pub title: String,
    pub html: String,
    pub cover: String,
}

#[derive(Debug, Serialize)]
pub struct ArticleData {
    pub id: String,
    pub url: String,
    pub title: String,
    pub beginning: String,
    pub cover: String,
    pub progress: u16,
    pub archived: bool,
    pub liked: bool,
    pub timestamp: String,
    pub tags: Vec<String>,
}

impl ArticleData {
    pub fn new() -> ArticleData {
        ArticleData {
            id: "".to_owned(),
            url: "".to_owned(),
            title: "".to_owned(),
            beginning: "".to_owned(),
            cover: "".to_owned(),
            progress: 0,
            archived: false,
            liked: false,
            timestamp: "".to_owned(),
            tags: vec![],
        }
    }
}

#[derive(Debug, Serialize)]
pub struct ArticleContent {
    pub id: String,
    pub url: String,
    pub title: String,
    pub html: String,
    pub position: u16,
    pub progress: u16,
    pub archived: bool,
    pub liked: bool,
    pub timestamp: String,
    pub tags: Vec<String>,
}

impl ArticleContent {
    pub fn new() -> ArticleContent {
        ArticleContent {
            id: "".to_owned(),
            url: "".to_owned(),
            title: "".to_owned(),
            html: "".to_owned(),
            position: 0,
            progress: 0,
            archived: false,
            liked: false,
            timestamp: "".to_owned(),
            tags: vec![],
        }
    }
}

#[derive(Debug, Serialize)]
pub struct Tag {
    id: String,
    tag: String,
}

#[derive(Debug, PartialEq)]
pub enum Kind {
    Add,
    Delete,
}

impl FromStr for Kind {
    type Err = ();

    fn from_str(input: &str) -> Result<Kind, Self::Err> {
        match input {
            "add" => Ok(Kind::Add),
            "delete" => Ok(Kind::Delete),
            _ => Err(()),
        }
    }
}
