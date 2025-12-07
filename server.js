import http from "http";

// MCP manifest
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

// Create HTTP server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Manifest endpoint
  if (method === "GET" && url === "/mcp/manifest") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(manifest));
    return;
  }

  // Tool invocation endpoint
  if (method === "POST" && url === "/mcp") {
    // Always respond with ping for now
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ tool: "ping", result: "pong" }));
    return;
  }

  // Default endpoint
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "MCP server running" }));
});

// Railway provides PORT env var
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("MCP Server listening on port", PORT);
});
