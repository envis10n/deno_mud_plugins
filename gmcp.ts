import * as api from "https://raw.githubusercontent.com/envis10n/deno_mud/main/src/plugin_api.ts";
import { buildGMCP, parseGMCPSupports, Option, env } from "./deps.ts";

function log(...args: any[]): void {
  console.log("[GMCP]", ...args);
}

export const __id = "gmcp";
export async function __init(context: api.IContext) {
  context.server.addListener("connect", async function (this: api.TcpServer, client: api.TcpClient) {
    client.parser.options.support(Option.GMCP);
    client.parser.WILL(Option.GMCP);
  });
  context.server.addListener("gmcp", async function (this: api.TcpClient, namespace: string, data: string | string[] | { [key: string]: any }) {
    switch (namespace) {
      case "Core.Hello":
        data = <{ [key: string]: any }>(data);
        const client: string = data.client || data.Client || "[NO CLIENT]";
        const version: string = data.version || data.Version || "[NO VERSION]";
        log(`<${this.guid}> GMCP enabled. Hello from ${client} ${version}`);
        break;
      case "Core.Supports.Set":
        log(parseGMCPSupports(data as string[]));
        break;
      case "External.Discord.Hello":
        this.send(buildGMCP("External.Discord.Info", { applicationid: env["DISCORD_APPID"] }));
        break;
      default:
        log(`<${this.guid}> GMCP Event ${namespace}`, data);
        break;
    }
  });
}