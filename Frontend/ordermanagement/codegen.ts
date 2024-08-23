
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5028/graphql/",
  documents: "**/*.{gql,graphql}",
  generates: {
    "src/graphql/schema.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    }
  }
};

export default config;
