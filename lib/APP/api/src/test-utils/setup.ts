import { testConn } from "./testConn";

/**
 * Creates an eventually-terminating database connection.
 */
testConn().then(() => process.exit())