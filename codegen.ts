import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: "Bearer <GITHUB_TOKEN>",
        },
      },
    },
  ],
  documents: ["graphql/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
