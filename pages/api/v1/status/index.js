import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = 0;
  const serverHealth = 0;
  const maxConnections = 0;
  const openedConnections = 0;

  response.status(200).json({
    updated_at: updatedAt,
    version: dbVersion,
    status: serverHealth,
    max_connections: maxConnections,
    opened_connections: openedConnections,
  });
}

export default status;
