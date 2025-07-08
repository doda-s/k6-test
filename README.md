# Teste de API com K6

- Execute o arquivo `run` de acordo com o seu sistema operacional:
    - `run-linux.sh`
    - `run-windows.bat`

O script irá subir os container via Docker Compose, através do `compose.yaml`

## Teste da API

Quando os containers subirem, automaticamente os testes do K6 iniciam. Por padrão, o teste demora 1 minutos, e utiliza 10 VUs. Isso pode ser alterado no arquivo `compose.yaml`.

Todos as métricas podem ser visualizadas no dashboard do Grafana, por meio do LGTM. Você pode acessar o dashboard com `http://localhost:7070`

### Dashboard

No diretório `dashboard/` contém um arquivo `dashboard.json`, você pode importar ele para o Grafana para visualizar o dashboard pronto com algumas informações.

# Teste com Playwright

> [!IMPORTANT]
> Para prosseguir, é necessário que o backend esteja rodando.

Você pode rodar o front de forma interativa utilizando `node frontend.js`, e depois acessando `http://127.0.0.1:3000`. Através do front, é possível ver a lista de formulários cadastrados, cadastrar um novo usuário, editar um usuário existente e deletar um usuário.

### Teste do Front

Para iniciar os testes do front, basta utilizar o comando `npx playwright test`. É possível executar os testes visualizando a UI, utilize `npx playwright test --ui`.