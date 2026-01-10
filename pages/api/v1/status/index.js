import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = (await database.query("SELECT now();")).rows[0].now;
  console.log("texto foda" + updatedAt);
  const dbVersion = (await database.query("SELECT version();")).rows[0].version;
  console.log("testo fosa" + dbVersion);
  const serverHealth = (await database.query("SELECT 1;")) ? 200 : 500;
  console.log(serverHealth);
  const maxConnections = await database
    .query("SHOW max_connections;")
    .then((res) => res.rows[0].max_connections);
  const openedConnections = await database
    .query("SELECT COUNT(*)::INT FROM pg_stat_activity;")
    .then((res) => parseInt(res.rows[0].count));
  console.log(openedConnections);

  response.status(200).json({
    updated_at: updatedAt,
    version: dbVersion,
    status: serverHealth,
    max_connections: maxConnections,
    opened_connections: openedConnections,
  });
}

export default status;
