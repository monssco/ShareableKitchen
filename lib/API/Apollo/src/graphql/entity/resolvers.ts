// Here we merge all the resolvers and export them

import * as path from 'path';
import {mergeResolvers, loadFilesSync } from 'graphql-tools';

const resolversArray = loadFilesSync(path.join(__dirname, "./**/*.resolvers.*"));

export const resolvers = mergeResolvers(resolversArray);