# AllianceBrag — memoria del proyecto

Sitio estático (HTML/CSS/JS, sin backend) para AllianceBrag.

## Infraestructura

- **Puerto asignado: 8091** (próximo libre tras 8080-8090 — ver
  `/home/hpp/tablero/projects.json` para la lista completa de puertos en uso).
- **`server.py`** ya creado: servidor estático simple
  (`ThreadingHTTPServer`), mismo patrón que `saverstore`.
- **Conexión Git:** lista — remoto `origin` ya apunta a
  `git@github-alliancebrag:DasLatam/alliancebrag.git` (rama `main`),
  con keypair SSH dedicada (`~/.ssh/id_ed25519_alliancebrag_github`,
  alias `github-alliancebrag` en `~/.ssh/config`). Sin commits propios
  todavía — el contenido del sitio (2026-06-23) está en el working
  tree sin pushear.
- **Firewall, cron y alta en el tablero:** todavía **pendientes** — no
  se ejecutó ningún comando de `sudo ufw`, no se agregó cron
  `@reboot`, y no se tocó `tablero/projects.json`. Ver `PUBLICAR.md` en
  esta misma carpeta para los pasos exactos (calcados de cómo se hizo
  con `saverstore` el 2026-06-22).

## Pendiente para terminar de publicar

1. ~~Sumar contenido real del sitio~~ — hecho (2026-06-23): home,
   about, services, contact (con formulario), 3 páginas legales, 404,
   CSS responsive mobile-first y JS mínimo. Logo y paleta tomados del
   sitio anterior en alliancebrag.com (ver `assets/img/`).
2. ~~Probar `server.py` a mano en el puerto 8091~~ — hecho, probado con
   Playwright (desktop + mobile, nav, formulario, 404 personalizado).
3. Hacer commit y push al repo (pendiente de aviso/confirmación del
   usuario — ver `PUBLICAR.md`).
4. Abrir el puerto en UFW (solo LAN, `192.168.1.0/24`).
5. Cron `@reboot`:
   `@reboot cd /home/hpp/alliancebrag && python3 server.py 8091 > logs/portal.log 2>&1`
6. Agregar entrada `id: "alliancebrag"` en `/home/hpp/tablero/projects.json`
   (`check_port: 8091`, `directory: "/home/hpp/alliancebrag"`).
7. Confirmar que aparece "online" en el tablero (`https://192.168.1.71/`).

Caddy/HTTPS **no** está configurado para este proyecto — se accede
directo por `http://192.168.1.71:8091`, igual que el resto de los
proyectos (solo el tablero, puerto 9000, está detrás de Caddy).
