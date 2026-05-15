interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Studio Ghibli MCP — fan API.
 * Auth: none. Docs: https://ghibliapi.vercel.app
 */


const BASE = 'https://ghibliapi.vercel.app';
const UA = 'pipeworx-mcp-studio-ghibli/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  { name: 'films', description: 'List films.', inputSchema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'film', description: 'Single film by id.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'people', description: 'List people/characters.', inputSchema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'person', description: 'Single person by id.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'locations', description: 'List locations.', inputSchema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'location', description: 'Single location by id.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'species', description: 'List species.', inputSchema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'species_one', description: 'Single species by id.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'vehicles', description: 'List vehicles.', inputSchema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'vehicle', description: 'Single vehicle by id.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'films': return gGet(`/films${limitQ(args)}`);
    case 'film': return gGet(`/films/${encodeURIComponent(reqStr(args, 'id', '"<uuid>"'))}`);
    case 'people': return gGet(`/people${limitQ(args)}`);
    case 'person': return gGet(`/people/${encodeURIComponent(reqStr(args, 'id', '"<uuid>"'))}`);
    case 'locations': return gGet(`/locations${limitQ(args)}`);
    case 'location': return gGet(`/locations/${encodeURIComponent(reqStr(args, 'id', '"<uuid>"'))}`);
    case 'species': return gGet(`/species${limitQ(args)}`);
    case 'species_one': return gGet(`/species/${encodeURIComponent(reqStr(args, 'id', '"<uuid>"'))}`);
    case 'vehicles': return gGet(`/vehicles${limitQ(args)}`);
    case 'vehicle': return gGet(`/vehicles/${encodeURIComponent(reqStr(args, 'id', '"<uuid>"'))}`);
    default: throw new Error(`Unknown tool: ${name}`);
  }
}

function limitQ(args: Record<string, unknown>): string {
  const l = (args.limit as number) | 0;
  return l > 0 ? `?limit=${Math.min(250, l)}` : '';
}

async function gGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('Ghibli: not found');
  if (!res.ok) throw new Error(`Ghibli: ${res.status}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
