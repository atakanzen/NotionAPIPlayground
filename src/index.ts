import { NotionClient } from "./notion";
import { Prompt } from "./prompt";

const main = async () => {
  const prompt = new Prompt();
  const answers = await prompt.getAnswers();

  const notion = new NotionClient(answers["notionToken"]);

  if (answers["getUsers"]) {
    await notion.getUsers();
  }

  if (answers["getDB"]) {
    await notion.retrieveDatabase(answers["dbID"]);
  }

  if (answers["searchWorkspace"]) {
    const pageOrDB = answers["pageOrDB"];
    const query = answers["titleQuery"];

    await notion.searchWorkspace(query, pageOrDB);
  }

  console.log("\nTake care stranger!");
};

main();
