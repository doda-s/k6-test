# Teste de Sistema Web

Todos os passos estão automatizados através de arquivos em lote. Você pode apenas executá-los que todo o processo será feito automaticamente.

## Iniciar Aplicação no Linux
```bash
sh run-linux.sh
```
Para executar juntamente com os testes do Playwright, você pode adicionar a flag `--test`. Opcionalmente você pode fazer o teste em modo UI, basta adicionar a flag `--ui`.

```bash
sh run-linux.sh --test --ui
```
## Iniciar Aplicação no Windows

```shell
./run-windows.bat
```

Para executar juntamente com os testes do Playwright, você pode adicionar a flag `--test`. Opcionalmente você pode fazer o teste em modo UI, basta adicionar a flag `--ui`.

```shell
./run-windows.bat --test --ui
```

O Docker Compose será iniciado automaticamente com todo o sistema. Em seguida, caso tenha adicionado as flags de teste, os testes serão executados. Por ultimo, um servidor local com o frontend irá subir.

- Endereço do Grafana: `http://localhost:7070`
- Endereço do frontend: `http://127.0.0.1:3000`

Caso queira executar os testes manualmente, você pode executar os tópicos a seguir.

## Teste de API com K6

Para realizar o teste da API com o K6, basta criar a pasta `/grafana` caso não exista, e iniciar o Docker Compose:
```bash
docker compose up
``` 

Quando os containers subirem, automaticamente os testes do K6 iniciam. Por padrão, o teste demora 1 minutos, e utiliza 10 VUs. Isso pode ser alterado no arquivo `compose.yaml`.

Todas as métricas podem ser visualizadas no dashboard do Grafana, por meio do LGTM. Você pode acessar o dashboard com `http://localhost:7070`
> [!TIP]
> No diretório `dashboard/` contém um arquivo `dashboard.json`, você pode importar ele para o Grafana para visualizar o dashboard pronto com algumas informações.

## Teste com Playwright

> [!IMPORTANT]
> Para prosseguir, é necessário que o backend esteja rodando.

Você pode rodar o front de forma interativa utilizando `node frontend.js`, e depois acessando `http://127.0.0.1:3000`. Através do front, é possível ver a lista de formulários cadastrados, cadastrar um novo usuário, editar um usuário existente e deletar um usuário.

### Teste do Front

Para iniciar os testes do front, basta utilizar o comando:

```bash
npx playwright test
```

É possível executar os testes visualizando a UI, utilize:

```bash
npx playwright test --ui
```