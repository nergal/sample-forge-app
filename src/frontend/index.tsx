import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text } from "@forge/react";
import { invoke } from "@forge/bridge";
const App = () => {
  const [data, setData] = useState<string|null>(null);
  useEffect(() => {
    invoke<string|null>("getText", { example: "my-invoke-variable" }).then(setData);
  }, []);
  return (
    <>
      <Text>Hello world2!</Text>
      <Text>{data ? data : "Loading..."}</Text>
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
