export function constructImageURL(file_name: string, collectionID: string, recordID: string) {
  return (
    import.meta.env.VITE_POCKETBASE_URL +
    '/api/files/' +
    collectionID +
    '/' +
    recordID +
    '/' +
    file_name
  );
}