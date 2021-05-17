
declare module '*/me.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MeQuery: DocumentNode;

  export default defaultDocument;
}
    