@echo off
setlocal enabledelayedexpansion

set i=1
set testfrontend=false
set testfrontendui=false

:verifyargsloop
call set arg=%%%i%%%
if defined arg (
    if "%arg%"=="--test" (
        set testfrontend=true
    )
    if "%arg%"=="--ui" (
        set testfrontendui=true
    )
    set /a i+=1
    goto verifyargsloop
)

set "DIR=%cd%\grafana"

echo Checking directories...

if exist "%DIR%" (
    echo The directory %DIR% exists.
) else (
    echo %DIR% does not exist.
    echo Creating directory: %DIR%...
    mkdir "%DIR%"
    echo Directory created.
)

echo Starting Docker containers...
docker compose up -d
echo Done.

echo Starting tests...
powershell -command "Start-Sleep -s 10"

if !testfrontend!==true (
    if !testfrontendui!==true (
        start cmd /k "npx playwright test --ui"
        goto startfrontserver
    )
    start cmd /k "npx playwright test"
)
echo Tests done.

:startfrontserver
echo Starting frontend...
node frontend.js

endlocal
pause