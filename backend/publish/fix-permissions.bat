@echo off
echo ==============================================================
echo Efficacious API - IIS Database Write Permissions Utility
echo ==============================================================
echo.
echo Granting IIS_IUSRS and IUSR Modify/Write permissions to API directory...
echo.

set "TARGET_DIR=%~dp0"
echo Target directory: %TARGET_DIR%

icacls "%TARGET_DIR%." /grant "IIS_IUSRS":(OI)(CI)M /T
icacls "%TARGET_DIR%." /grant "IUSR":(OI)(CI)M /T
icacls "%TARGET_DIR%Efficacious.db" /grant "IIS_IUSRS":M
icacls "%TARGET_DIR%Efficacious.db" /grant "IUSR":M

echo.
echo ==============================================================
echo Permissions successfully granted!
echo SQLite can now create WAL logs and persist writes without HTTP 500.
echo ==============================================================
pause

