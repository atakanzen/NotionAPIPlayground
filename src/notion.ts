import { APIResponseError, Client } from "@notionhq/client/build/src";
import { SearchFilter } from "@notionhq/client/build/src/api-types";

export class NotionClient {
  private _notionClient: Client;

  constructor(notion: Client) {
    this._notionClient = notion;
  }

  getUsers = async () => {
    try {
      return await this._notionClient.users.list();
    } catch (err) {}
  };

  retrieveDatabase = async (databaseID?: string) => {
    try {
      if (databaseID == undefined) {
        throw new Error("DATABASE_ID environment variable is undefined");
      }

      return await this._notionClient.databases.retrieve({
        database_id: databaseID,
      });
    } catch (err) {}
  };

  searchWorkspace = async (query: string, filterBy?: SearchFilter) => {
    try {
      return await this._notionClient.search({
        query: query,
        filter: filterBy,
        sort: {
          direction: "descending",
          timestamp: "last_edited_time",
        },
      });
    } catch (err) {}
  };
}
