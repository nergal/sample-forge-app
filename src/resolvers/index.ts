import Resolver from '@forge/resolver';
import { getToken, setToken } from './token';
import { fetchRepositories } from './github';

const resolver = new Resolver();

resolver.define('fetchRepositories', fetchRepositories);
resolver.define('getToken', getToken);
resolver.define('setToken', setToken);

export const handler = resolver.getDefinitions();
