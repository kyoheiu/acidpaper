use tantivy::schema::*;
use tantivy::Index;
use tantivy::IndexReader;
use tantivy::ReloadPolicy;

pub fn initialize_schema() -> (Schema, Index, IndexReader) {
    let search_dir = std::path::PathBuf::from(".search_dir");
    if !search_dir.exists() {
        std::fs::create_dir(".search_dir").unwrap();
    }

    let mut schema_builder = Schema::builder();
    schema_builder.add_text_field("id", TEXT | STORED);
    schema_builder.add_text_field("title", TEXT | STORED);
    schema_builder.add_text_field("plain", TEXT);
    let schema = schema_builder.build();

    let meta_file = std::path::PathBuf::from(".search_dir/meta.json");
    if meta_file.exists() {
        let index = Index::open_in_dir(&search_dir).unwrap();
        let reader = index
            .reader_builder()
            .reload_policy(ReloadPolicy::OnCommit)
            .try_into()
            .unwrap();
        (schema, index, reader)
    } else {
        let index = Index::create_in_dir(&search_dir, schema.clone()).unwrap();
        let reader = index
            .reader_builder()
            .reload_policy(ReloadPolicy::OnCommit)
            .try_into()
            .unwrap();
        (schema, index, reader)
    }
}