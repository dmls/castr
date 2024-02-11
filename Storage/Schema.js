export const CollectionsSchema = `
  CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    created INTEGER,
    image TEXT
  );
`;

export const MembersSchema = `
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    created INTEGER,
    image TEXT
  );
`;
