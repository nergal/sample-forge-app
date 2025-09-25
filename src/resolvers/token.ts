import { kvs } from '@forge/kvs';
import { ResolverFunction } from '@forge/resolver';

const GITHUB_TOKEN_KEY = 'my-token';

type TokenPayload = {
    token: string;
}

const getToken = async () => {
    return kvs.getSecret<string>(GITHUB_TOKEN_KEY) || null;
};

const setToken: ResolverFunction<TokenPayload, void> = async (request) => {
    await kvs.setSecret(GITHUB_TOKEN_KEY, request.payload.token);
};

export { getToken, setToken };