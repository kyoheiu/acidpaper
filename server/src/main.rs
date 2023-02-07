mod core;
mod error;
mod handler;
mod schema;
mod scrape;
mod statements;
mod types;

use crate::core::{run, Core};

use error::AcidError;
use log::info;
use std::net::TcpListener;

#[tokio::main]
async fn main() -> Result<(), AcidError> {
    env_logger::init();
    let core = Core::new()?;
    let listener = TcpListener::bind("0.0.0.0:8000").expect("Failed to listen.");
    info!("Start listening on {:?}", listener);
    run(listener, core).await;
    Ok(())
}
