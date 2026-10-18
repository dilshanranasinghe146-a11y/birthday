@echo off
title Birthday Site Server
echo.
echo Starting Birthday Website Server...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
