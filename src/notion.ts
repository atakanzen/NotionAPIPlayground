import { Client } from "@notionhq/client/build/src";

export class NotionClient {
  private _notionClient: Client;

  constructor(auth: string) {
    this._notionClient = new Client({ auth: auth });
  }

  getUsers = async () => {
    try {
      const users = await this._notionClient.users.list();
      console.log("\nUsers:");
      console.log(users);
    } catch (err) {}
  };

  retrieveDatabase = async (databaseID: string) => {
    try {
      const database = await this._notionClient.databases.retrieve({
        database_id: databaseID,
      });
      console.log("\nDatabase Result:");
      console.log(database);
    } catch (err) {}
  };

  searchWorkspace = async (query: string, pageOrDB: "page" | "database") => {
    try {
      const search = await this._notionClient.search({
        query: query,
        filter: {
          property: "object",
          value: pageOrDB,
        },
        sort: {
          direction: "descending",
          timestamp: "last_edited_time",
        },
      });
      console.log("\nSearch Result:");
      console.log(search);
    } catch (err) {}
  };
}
