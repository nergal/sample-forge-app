import React, { useEffect, useState } from "react";
import ForgeReconciler, { Stack, Text } from "@forge/react";
import { invoke } from "@forge/bridge";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { RepositoryCard } from "./components/RepositoryCard";

type Repositories =
  RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"];

const App = () => {
  const [data, setData] = useState<Repositories | null>(null);

  useEffect(() => {
    invoke<any>("fetchRepositories").then(setData);
  }, []);

  return (
    <>
      <Text>Hello world2!</Text>
      {data && (
        <Stack alignInline="start" space="space.200">
          {data.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </Stack>
      )}
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
