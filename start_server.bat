@echo off
chcp 65001 >nul
title SH3 Ship Recognition - Serveur Local
echo.
echo ==========================================
echo    SH3 SHIP RECOGNITION - Onealex Mod 3.2
echo ==========================================
echo.
echo Demarrage du serveur local sur le port 8080...
echo.

:: Verifier si Python est installe
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python detecte
    echo.
    echo Lancement du serveur HTTP...
    echo Appuyez sur CTRL+C pour arreter le serveur
    echo.
    
    :: Lancer le serveur en arriere-plan
    start "Serveur SH3" python -m http.server 8080
    
    :: Attendre 2 secondes que le serveur demarre
    timeout /t 2 /nobreak >nul
    
    :: Ouvrir Opera
    echo Ouverture du navigateur Opera...
    start opera "http://localhost:8080"
    
    echo.
    echo ==========================================
    echo Serveur actif sur http://localhost:8080
    echo ==========================================
    echo.
    pause
    exit
)

:: Si Python n'est pas trouve, essayer avec Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js detecte
    echo.
    
    :: Verifier si http-server est installe globalement
    call npx http-server --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Lancement du serveur avec npx http-server...
        start "Serveur SH3" npx http-server -p 8080 -o
        
        timeout /t 3 /nobreak >nul
        
        echo Ouverture du navigateur Opera...
        start opera "http://localhost:8080"
        
        echo.
        echo ==========================================
        echo Serveur actif sur http://localhost:8080
        echo ==========================================
        echo.
        pause
        exit
    )
    
    :: Sinon utiliser le module built-in de Node
    echo Tentative avec Node.js http-server integre...
    echo.
    
    :: Creer un script temporaire pour le serveur
    echo const http = require('http'); > server_temp.js
    echo const fs = require('fs'); >> server_temp.js
    echo const path = require('path'); >> server_temp.js
    echo. >> server_temp.js
    echo const server = http.createServer((req, res) => { >> server_temp.js
    echo   let filePath = '.' + req.url; >> server_temp.js
    echo   if (filePath == './') filePath = './index.html'; >> server_temp.js
    echo. >> server_temp.js
    echo   const extname = String(path.extname(filePath)).toLowerCase(); >> server_temp.js
    echo   const mimeTypes = { >> server_temp.js
    echo     '.html': 'text/html', >> server_temp.js
    echo     '.js': 'text/javascript', >> server_temp.js
    echo     '.css': 'text/css', >> server_temp.js
    echo     '.json': 'application/json', >> server_temp.js
    echo     '.png': 'image/png', >> server_temp.js
    echo     '.jpg': 'image/jpg', >> server_temp.js
    echo     '.gif': 'image/gif', >> server_temp.js
    echo     '.svg': 'image/svg+xml', >> server_temp.js
    echo     '.wav': 'audio/wav', >> server_temp.js
    echo     '.mp4': 'video/mp4', >> server_temp.js
    echo     '.woff': 'application/font-woff', >> server_temp.js
    echo     '.ttf': 'application/font-ttf', >> server_temp.js
    echo     '.eot': 'application/vnd.ms-fontobject', >> server_temp.js
    echo     '.otf': 'application/font-otf', >> server_temp.js
    echo     '.wasm': 'application/wasm' >> server_temp.js
    echo   }; >> server_temp.js
    echo. >> server_temp.js
    echo   const contentType = mimeTypes[extname] ^|^| 'application/octet-stream'; >> server_temp.js
    echo. >> server_temp.js
    echo   fs.readFile(filePath, (error, content) => { >> server_temp.js
    echo     if (error) { >> server_temp.js
    echo       if(error.code == 'ENOENT') { >> server_temp.js
    echo         res.writeHead(404, { 'Content-Type': 'text/html' }); >> server_temp.js
    echo         res.end('^<h1^>404 Not Found^</h1^>', 'utf-8'); >> server_temp.js
    echo       } else { >> server_temp.js
    echo         res.writeHead(500); >> server_temp.js
    echo         res.end('Sorry, check with the site admin for error: '+error.code+' ..\n'); >> server_temp.js
    echo       } >> server_temp.js
    echo     } else { >> server_temp.js
    echo       res.writeHead(200, { 'Content-Type': contentType }); >> server_temp.js
    echo       res.end(content, 'utf-8'); >> server_temp.js
    echo     } >> server_temp.js
    echo   }); >> server_temp.js
    echo }); >> server_temp.js
    echo. >> server_temp.js
    echo const PORT = 8080; >> server_temp.js
    echo server.listen(PORT, () =^> { >> server_temp.js
    echo   console.log(`Serveur demarre sur http://localhost:${PORT}`); >> server_temp.js
    echo }); >> server_temp.js
    
    start "Serveur SH3" node server_temp.js
    
    timeout /t 2 /nobreak >nul
    
    echo Ouverture du navigateur Opera...
    start opera "http://localhost:8080"
    
    echo.
    echo ==========================================
    echo Serveur actif sur http://localhost:8080
    echo ==========================================
    echo.
    echo Appuyez sur une touche pour arreter le serveur...
    pause >nul
    
    :: Nettoyage
    taskkill /F /FI "WINDOWTITLE eq Serveur SH3" >nul 2>&1
    del server_temp.js >nul 2>&1
    exit
)

:: Si aucun n'est disponible
echo [ERREUR] Ni Python ni Node.js n'ont ete trouves !
echo.
echo Veuillez installer l'un des deux :
echo  - Python : https://www.python.org/downloads/
echo  - Node.js : https://nodejs.org/
echo.
pause
exit