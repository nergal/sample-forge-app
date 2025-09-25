import { getToken } from "./token";
import { Octokit } from "@octokit/rest";

const fetchRepositories = async () => {
  const token = await getToken();
  if (!token) {
    return [];
  }

  const octokit = new Octokit({ auth: token });
  const response = await octokit.rest.repos.listForAuthenticatedUser();

  return response.data;
};

export { fetchRepositories };
