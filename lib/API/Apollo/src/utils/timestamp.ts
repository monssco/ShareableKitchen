// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()