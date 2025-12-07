export default async function handler(req, res) {
  const url = req.url;

  // MANIFEST ENDPOINT
  if (url.endsWith("/manifest") && req.method === "GET") {
    const manifest = {
      type: "list_tools",
      tools: [
        {
          name: "ping",
          description: "Returns pong",
          input_schema: {},
          output_schema: {}
        }
      ]
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(manifest));
    return;
  }

  // TOOL EXECUTION ENDPOINT (POST ONLY)
  if (url.endsWith("/mcp") && req.method === "POST") {
    const response = {
      tool: "ping",
      result: "pong"
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(response));
    return;
  }

  // PREVENT 500 ERRORS FOR INVALID METHODS
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({
    status: "MCP server active",
    detail: "Send POST to /mcp or GET /mcp/manifest"
  }));
}
