import * as api from "https://raw.githubusercontent.com/envis10n/deno_mud/main/src/plugin_api.ts";
export const __id = "echo";
export async function __init(context: api.IContext) {
  context.server.addListener("connect", async function (this: api.TcpServer, client: api.TcpClient) {
    await client.send("(DEMO)> ", true);
  });
  context.server.addListener("data", async function (this: api.TcpClient, chunk: Uint8Array) {
    await this.send(chunk);
    await this.send("(DEMO)> ", true);
  });
}