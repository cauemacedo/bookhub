# Rotas da API do BookHub

## Campos para o futuro backend

A [modelagem atual](modelagem-dados.md) já tem usuários e projetos. As rotas abaixo usam os campos de usuário que já existem e propõem os campos das outras tabelas.

| Tabela | Campos |
| --- | --- |
| Usuários | `id`, `nome`, `email` (único) |
| Empresas | `id`, `nome` |
| Vínculos entre usuários e empresas | `usuario_id`, `empresa_id`. O mesmo par só pode ser cadastrado uma vez. |
| Obras | `id`, `titulo`, `autor`, `categoria_id` |
| Categorias | `id`, `nome` (único) |

## Regras gerais

- Os IDs são números inteiros positivos. O servidor gera o `id` dos novos registros.
- O corpo (Body) é enviado em JSON. No POST, todos os campos indicados são obrigatórios. No PATCH, envie pelo menos um dos campos indicados.
- Campos de texto precisam ter conteúdo após retirar os espaços das pontas.
- As listas retornam `200` com um array, que pode estar vazio. As respostas `204` vêm sem corpo.

## Usuários

| Método e caminho | Objetivo | Body ou parâmetros | Validações | Respostas |
| --- | --- | --- | --- | --- |
| `GET /usuarios` | Listar usuários. | Nenhum. | A rota não exige dados de entrada. | `200` lista de usuários. |
| `GET /usuarios/{id}` | Buscar um usuário. | Caminho: `id`. | ID válido e usuário existente. | `200` usuário, `400` ID inválido, `404` usuário não encontrado. |
| `POST /usuarios` | Cadastrar um usuário. | Body: `nome`, `email`. | Nome preenchido e e-mail válido e único. | `201` usuário criado, `400` dados inválidos, `409` e-mail já cadastrado. |
| `PATCH /usuarios/{id}` | Atualizar o nome ou o e-mail. | Caminho: `id`. Body: `nome` e/ou `email`. | ID válido, usuário existente e campos enviados válidos. Se mudar o e-mail, ele precisa estar livre. | `200` usuário atualizado, `400` dados inválidos, `404` usuário não encontrado, `409` e-mail já cadastrado. |
| `DELETE /usuarios/{id}` | Remover um usuário. | Caminho: `id`. | ID válido e usuário existente, sem projetos ou vínculos com empresas. | `204` removido, `400` ID inválido, `404` usuário não encontrado, `409` usuário com projetos ou vínculos. |

## Empresas

| Método e caminho | Objetivo | Body ou parâmetros | Validações | Respostas |
| --- | --- | --- | --- | --- |
| `GET /empresas` | Listar empresas. | Nenhum. | A rota não exige dados de entrada. | `200` lista de empresas. |
| `GET /empresas/{id}` | Buscar uma empresa. | Caminho: `id`. | ID válido e empresa existente. | `200` empresa, `400` ID inválido, `404` empresa não encontrada. |
| `POST /empresas` | Cadastrar uma empresa. | Body: `nome`. | Nome preenchido. | `201` empresa criada, `400` dados inválidos. |
| `PATCH /empresas/{id}` | Atualizar o nome da empresa. | Caminho: `id`. Body: `nome`. | ID válido, empresa existente e nome preenchido. | `200` empresa atualizada, `400` dados inválidos, `404` empresa não encontrada. |
| `DELETE /empresas/{id}` | Remover uma empresa. | Caminho: `id`. | ID válido e empresa existente, sem usuários vinculados. | `204` removida, `400` ID inválido, `404` empresa não encontrada, `409` empresa com vínculos. |

## Relação entre usuários e empresas

Um usuário pode estar vinculado a várias empresas. Uma empresa pode ter vários usuários.

| Método e caminho | Objetivo | Body ou parâmetros | Validações | Respostas |
| --- | --- | --- | --- | --- |
| `GET /empresas/{empresa_id}/usuarios` | Listar os usuários vinculados à empresa. | Caminho: `empresa_id`. | ID válido e empresa existente. | `200` lista de usuários vinculados, `400` ID inválido, `404` empresa não encontrada. |
| `POST /empresas/{empresa_id}/usuarios` | Vincular um usuário à empresa. | Caminho: `empresa_id`. Body: `usuario_id`. | IDs válidos, empresa e usuário existentes, sem vínculo entre eles. | `201` vínculo criado, `400` dados inválidos, `404` empresa ou usuário não encontrado, `409` vínculo já cadastrado. |
| `DELETE /empresas/{empresa_id}/usuarios/{usuario_id}` | Remover o vínculo. | Caminho: `empresa_id`, `usuario_id`. | IDs válidos e vínculo existente. | `204` vínculo removido, `400` ID inválido, `404` vínculo não encontrado. |

## Obras

Cada obra pertence a uma categoria.

| Método e caminho | Objetivo | Body ou parâmetros | Validações | Respostas |
| --- | --- | --- | --- | --- |
| `GET /obras` | Listar obras. | Nenhum. | A rota não exige dados de entrada. | `200` lista de obras. |
| `GET /obras/{id}` | Buscar uma obra. | Caminho: `id`. | ID válido e obra existente. | `200` obra, `400` ID inválido, `404` obra não encontrada. |
| `POST /obras` | Cadastrar uma obra. | Body: `titulo`, `autor`, `categoria_id`. | Título e autor preenchidos. ID da categoria válido e categoria existente. | `201` obra criada, `400` dados inválidos, `404` categoria não encontrada. |
| `PATCH /obras/{id}` | Atualizar os dados de uma obra. | Caminho: `id`. Body: um ou mais entre `titulo`, `autor` e `categoria_id`. | ID válido, obra existente e campos enviados válidos. Se mudar a categoria, ela precisa existir. | `200` obra atualizada, `400` dados inválidos, `404` obra ou categoria não encontrada. |
| `DELETE /obras/{id}` | Remover uma obra. | Caminho: `id`. | ID válido e obra existente. | `204` removida, `400` ID inválido, `404` obra não encontrada. |

## Categorias

| Método e caminho | Objetivo | Body ou parâmetros | Validações | Respostas |
| --- | --- | --- | --- | --- |
| `GET /categorias` | Listar categorias. | Nenhum. | A rota não exige dados de entrada. | `200` lista de categorias. |
| `GET /categorias/{id}` | Buscar uma categoria. | Caminho: `id`. | ID válido e categoria existente. | `200` categoria, `400` ID inválido, `404` categoria não encontrada. |
| `POST /categorias` | Cadastrar uma categoria. | Body: `nome`. | Nome preenchido e único. | `201` categoria criada, `400` dados inválidos, `409` nome já cadastrado. |
| `PATCH /categorias/{id}` | Atualizar o nome da categoria. | Caminho: `id`. Body: `nome`. | ID válido, categoria existente e nome preenchido e livre entre as outras categorias. | `200` categoria atualizada, `400` dados inválidos, `404` categoria não encontrada, `409` nome já cadastrado. |
| `DELETE /categorias/{id}` | Remover uma categoria. | Caminho: `id`. | ID válido e categoria existente, sem obras associadas. | `204` removida, `400` ID inválido, `404` categoria não encontrada, `409` categoria com obras. |
