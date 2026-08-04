# @pipeworx/studio-ghibli

[Studio Ghibli API](https://ghibliapi.vercel.app) MCP — fan-built API of Studio Ghibli films, people, locations, species, and vehicles. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `films(limit?)` — list films
- `film(id)` — single film
- `people(limit?)` / `person(id)` — characters
- `locations(limit?)` / `location(id)` — locations
- `species(limit?)` / `species_one(id)` — species
- `vehicles(limit?)` / `vehicle(id)` — vehicles

## Data source

`https://ghibliapi.vercel.app/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "studio-ghibli": {
      "url": "https://gateway.pipeworx.io/studio-ghibli/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Studio Ghibli data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
