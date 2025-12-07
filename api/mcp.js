cat > api/mcp.js << 'EOF'
export default async function handler(req, res) {
  // MANIFEST ENDPOINT
  if (req.url.endsWith("/manifest") && req.method === "GET") {
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

  // TOOL EXECUTION ENDPOINT
  if (req.url.endsWith("/mcp") && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const response = {
        tool: "ping",
        result: "pong"
      };

      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(response));
    });

    return;
  }

  // DEFAULT
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ status: "MCP server active" }));
}
EOF
