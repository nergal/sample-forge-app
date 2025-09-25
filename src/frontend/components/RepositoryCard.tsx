import type { FC } from "react";
import {
  Box,
  Heading,
  Inline,
  Link,
  Lozenge,
  Stack,
  Text,
  xcss,
} from "@forge/react";
import { RestEndpointMethodTypes } from "@octokit/rest";

type Repository =
  RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"][number];

const containerStyles = xcss({
  backgroundColor: "elevation.surface.raised",
  boxShadow: "elevation.shadow.raised",
  padding: "space.200",
  borderRadius: "border.radius",
  width: "100%",
});

export const RepositoryCard: FC<{ repository: Repository }> = ({
  repository,
}) => (
  <Box xcss={containerStyles}>
    <Stack space="space.100">
      <Inline space="space.100">
        <Heading size="xlarge">
          <Link href={repository.html_url}>
            {repository.owner.login} / {repository.name}
          </Link>
        </Heading>
        <Lozenge appearance="default">
          {repository.private ? "Private" : "Public"}
        </Lozenge>
      </Inline>
      <Text>{repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      default_branch fork forks license private html_url watchers_count
      owner.avatar_url owner.html_url owner.login
    </Stack>
  </Box>
);
