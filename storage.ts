import * as api from "https://raw.githubusercontent.com/envis10n/deno_mud/main/src/plugin_api.ts";

interface IStorageDemo extends api.IDocument {
  test: string;
}

export const __id = "storage";

export async function __init(context: api.IContext): Promise<void> {
  const col: api.Collection<IStorageDemo> = context.db.collection("storage-demo");
  col.insert({ test: "Hello, world!" });
  col.insert({ test: "There can only be one!", _key: "demo1" });
  console.log(col.contents);
}