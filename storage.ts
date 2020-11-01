import { api } from "./deps.ts";

interface IStorageDemo {
  test: string;
}

export const __id = "storage";

export async function __init(context: api.IContext): Promise<void> {
  const col: api.Collection<IStorageDemo> = context.db.collection("storage-demo");
  col.contents.push({ test: "Hello, world!" });
  console.log(col.contents);
}