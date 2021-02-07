import * as path from 'path';
import * as fs from 'fs';
import {print} from 'graphql';

import {loadFilesSync, mergeTypeDefs} from 'graphql-tools';

const typeDefsArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"));

export const typeDefs = mergeTypeDefs(typeDefsArray);

const printedTypeDefs = print(typeDefs);
fs.writeFileSync('schema.graphql', printedTypeDefs);
