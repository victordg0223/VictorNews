test("Valida data Status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // Faz a requisição para o endpoint de status
  expect(response.status).toBe(200); // Verifica se o status da resposta é 200

  const responseBody = await response.json(); // Converte a resposta para JSON
  expect(responseBody.updated_at).toBeDefined(); // Verifica se o campo updated_at está definido

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Tenta converter o campo updated_at para uma data válida
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); // Verifica se o campo updated_at é uma data válida
});

test("Valida versão Postgress", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.version).toBeDefined();
  // A versão pode ser string (ex: "PostgreSQL 15.3") ou número; garantimos que exista e seja válida
  expect(["string", "number"]).toContain(typeof body.version);
  if (typeof body.version === "string") {
    expect(body.version.length).toBeGreaterThan(0);
  } else {
    expect(body.version).toBeGreaterThanOrEqual(0);
  }
});

test("Validar saúde do servidor", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.status).toBeDefined();
  expect(typeof body.status).toBe("number");
  // Definimos que o servidor saudável retorna 200
  expect(body.status).toBe(200);
});

test("Validar conexões máximas", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.max_connections).toBeDefined();
  expect(typeof body.max_connections).toBe("number");
  expect(Number.isInteger(body.max_connections)).toBe(true);
  expect(body.max_connections).toBeGreaterThan(0);
});

test("Validar conexões usadas", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.opened_connections).toBeDefined();
  expect(typeof body.opened_connections).toBe("number");
  expect(Number.isInteger(body.opened_connections)).toBe(true);
  expect(body.opened_connections).toBeGreaterThanOrEqual(0);
  // conexões abertas não podem exceder o máximo
  expect(body.opened_connections).toBeLessThanOrEqual(body.max_connections);
});
