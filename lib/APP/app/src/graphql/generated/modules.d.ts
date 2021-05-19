
declare module '*/me.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MeQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/myListings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const myListingsQuery: DocumentNode;

  export default defaultDocument;
}
    