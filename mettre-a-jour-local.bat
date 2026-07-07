@echo off
REM ============================================================
REM  KONCIERGATE - Mise a jour du site dans Local (LocalWP)
REM  Double-cliquer apres avoir modifie images/videos/textes.
REM ============================================================
setlocal
cd /d "%~dp0"

set "LOCAL_PUBLIC=C:\Users\jonat\Local Sites\konciergate\app\public"

echo.
echo [1/4] Construction du site (peut prendre 1-2 minutes)...
set NEXT_PUBLIC_STATIC_EXPORT=true
set NEXT_PUBLIC_BASE_PATH=/
set NEXT_PUBLIC_SITE_URL=http://konciergate.local

if exist "src\app\api" move "src\app\api" "%TEMP%\kg_api_bk" >nul 2>&1

call npm run build
set BUILD_ERR=%ERRORLEVEL%

if exist "%TEMP%\kg_api_bk" move "%TEMP%\kg_api_bk" "src\app\api" >nul 2>&1

if not %BUILD_ERR%==0 (
  echo.
  echo *** ERREUR DE BUILD - le site Local n'a PAS ete modifie. ***
  pause
  exit /b 1
)

echo.
echo [2/4] Page de redirection racine...
copy /Y "scripts\root-index.html" "out\index.html" >nul

echo.
echo [3/4] Copie vers Local (%LOCAL_PUBLIC%)...
robocopy "out" "%LOCAL_PUBLIC%" /MIR /NFL /NDL /NJH /NJS /NP >nul
if %ERRORLEVEL% GEQ 8 (
  echo *** ERREUR DE COPIE vers Local. ***
  pause
  exit /b 1
)

echo.
echo [4/4] Termine !
echo.
echo   Ouvre :  http://konciergate.local
echo   (Ctrl+F5 dans le navigateur pour vider le cache)
echo.
pause
