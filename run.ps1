# Script de Build e Execucao do ScheduleNow (Backend API + Frontend)
$ErrorActionPreference = "Stop"

$rootPath = $PSScriptRoot
if (-not $rootPath) {
    $rootPath = Get-Location
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " 1. Compilando a API de Backend (.NET 9)..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

dotnet build "$rootPath\Backend\Scheduling.Api\Scheduling.Api.csproj"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha na compilacao do Backend!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " 2. Executando o Backend API (em nova janela)..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$backendProjectDir = Join-Path $rootPath "Backend\Scheduling.Api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendProjectDir'; Write-Host '--- ScheduleNow Backend API ---' -ForegroundColor Green; dotnet run"

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " 3. Compilando o Frontend (Angular 21)..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

npm --prefix "$rootPath\Frontend" run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha na compilacao do Frontend!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " 4. Executando o Frontend (ng serve)..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Set-Location "$rootPath\Frontend"
npm start
