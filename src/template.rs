use serde::Serialize;

#[derive(Serialize)]
pub struct Hello<'a> {
    pub name: &'a str,
}

#[derive(Debug, Serialize)]
pub struct Article {
    pub id: String,
    pub url: String,
    pub title: String,
    pub html: String,
    pub plain: String,
    pub beginning: String,
    pub timestamp: String,
}

impl Article {
    pub fn new() -> Article {
        Article {
            id: "".to_owned(),
            url: "".to_owned(),
            title: "".to_owned(),
            html: "".to_owned(),
            plain: "".to_owned(),
            beginning: "".to_owned(),
            timestamp: "".to_owned(),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct Articles {
    pub articles: Vec<Article>,
}
