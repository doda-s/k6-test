@echo off
setlocal

set "DIR=%cd%\grafana"

if exist "%DIR%" (
    echo Diretório %DIR% existe.
) else (
    echo Criando o diretório %DIR%...
    mkdir "%DIR%"
    echo Diretório criado!
)

docker compose up -d

endlocal
pause