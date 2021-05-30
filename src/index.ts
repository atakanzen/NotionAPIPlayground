import { Client } from "@notionhq/client/build/src";
import { SearchFilter } from "@notionhq/client/build/src/api-types";
import { config } from "dotenv";
import { NotionClient } from "./notion";
import { Prompt } from "./prompt";

config({ path: `${process.cwd()}/env/.env` });

const main = async () => {
  const prompt = new Prompt();
  const answers = await prompt.getAnswers();

  const client = new Client({ auth: answers["notionToken"] });

  const notion = new NotionClient(client);

  if (answers["getUsers"]) {
    console.log("\nGetting users from workspace...");
    const users = await notion.getUsers();
    console.log("Users:");
    console.log(users);
  }

  if (answers["getDB"]) {
    console.log("\nRetrieving database...");
    const database = await notion.retrieveDatabase(answers["dbID"]);
    console.log("Database:");
    console.log(database);
  }

  if (answers["searchWorkspace"]) {
    console.log("\nSearching workspace...");
    const pageOrDB = answers["pageOrDB"];
    const query = answers["titleQuery"];

    const filterBy: SearchFilter = {
      property: "object",
      value: pageOrDB,
    };

    const searchResponse = await notion.searchWorkspace(query, filterBy);

    console.log("\nSearch Response:");
    console.log(searchResponse);
  }

  console.log("\nTake care stranger!");
};

main();
