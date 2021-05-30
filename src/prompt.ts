import prompts, { PromptObject } from "prompts";

export class Prompt {
  private _prompts;
  private _questions: PromptObject[] = [
    {
      type: "invisible",
      name: "notionToken",
      message: "Please provide your integration's API token:",
      validate: (val?: string) => val !== "",
    },
    {
      type: "toggle",
      name: "getUsers",
      message: "Do you want to fetch users in your workspace?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "getDB",
      message: "Do you want to fetch a database in your workspace?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: (prev: boolean) => (prev ? "password" : null),
      name: "dbID",
      message: "Please provide the ID of the database that you want to fetch:",
      validate: (val?: string) => val !== "",
    },
    {
      type: "toggle",
      name: "searchWorkspace",
      message: "Do you want to search your workspace?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: (prev: boolean) => (prev ? "select" : null),
      name: "pageOrDB",
      message: "Do you want to search for a page or a database?",
      choices: [
        {
          title: "Page",
          description: "Search for a Notion Page",
          value: "page",
        },
        {
          title: "Database",
          description: "Search for a Notion Database",
          value: "database",
        },
      ],
      initial: 0,
    },
    {
      type: (_, values) => (values["searchWorkspace"] ? "text" : null),
      name: "titleQuery",
      message: (_, values) => `What's the title of your ${values["pageOrDB"]}?`,
    },
  ];

  constructor() {
    this._prompts = prompts;
  }

  private onCancel() {
    console.log("As you wish, see you soon stranger!");
    process.exit(0);
  }

  async getAnswers() {
    return this._prompts(this._questions, { onCancel: this.onCancel });
  }
}
