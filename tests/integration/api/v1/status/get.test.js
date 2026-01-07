test("Valida data Status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // Faz a requisição para o endpoint de status
  expect(response.status).toBe(200); // Verifica se o status da resposta é 200

  const responseBody = await response.json(); // Converte a resposta para JSON
  expect(responseBody.updated_at).toBeDefined(); // Verifica se o campo updated_at está definido

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Tenta converter o campo updated_at para uma data válida
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); // Verifica se o campo updated_at é uma data válida
});
test("Valida versão Postgress", async () => {});
test("Validar saúde do servidor", async () => {});
test("Validar conexões máximas", async () => {});
test("Validar conexões usadas", async () => {});
