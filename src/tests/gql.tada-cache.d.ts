/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "query UserQuery($id: ID!) {\n  user(id: $id){\n    id\n  }\n}":
      TadaDocumentNode<{ user: { id: string; } | null; }, { id: string; }, void>;
  }
}
