import Resolver from '@forge/resolver';
import { getToken, setToken } from './token';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world3!';
});

resolver.define('getToken', getToken);
resolver.define('setToken', setToken);

export const handler = resolver.getDefinitions();
