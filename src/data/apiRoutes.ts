/**
 * Edit this file to add new API paths and their response types.
 * Returns a mapping of API paths to their response types and versions.
 */
export function getAPIPathMap() {
  return {
    'api/test': { response: {} as object, version: 'v1', method: 'GET' },
  } as const;
}
