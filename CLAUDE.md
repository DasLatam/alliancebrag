# AllianceBrag — memoria del proyecto

Sitio estático (HTML/CSS/JS, sin backend) para AllianceBrag.

## Infraestructura

- **Puerto asignado: 8091** (próximo libre tras 8080-8090 — ver
  `/home/hpp/tablero/projects.json` para la lista completa de puertos en uso).
- **`server.py`** ya creado: servidor estático simple
  (`ThreadingHTTPServer`), mismo patrón que `saverstore`.
- **Firewall, cron, alta en el tablero y conexión Git:** todavía
  **pendientes** — no se ejecutó ningún comando de `sudo ufw`, no se
  agregó cron `@reboot`, no se tocó `tablero/projects.json`, y no se
  generó keypair SSH para un repo. Ver `PUBLICAR.md` en esta misma
  carpeta para los pasos exactos (calcados de cómo se hizo con
  `saverstore` el 2026-06-22).

## Pendiente para terminar de publicar

Ver `PUBLICAR.md`:
1. Sumar contenido real del sitio (`index.html`, css/js) — la carpeta
   está vacía salvo `server.py`/`logs/`.
2. Probar `server.py` a mano en el puerto 8091.
3. Abrir el puerto en UFW (solo LAN, `192.168.1.0/24`).
4. Cron `@reboot`:
   `@reboot cd /home/hpp/alliancebrag && python3 server.py 8091 > logs/portal.log 2>&1`
5. Agregar entrada `id: "alliancebrag"` en `/home/hpp/tablero/projects.json`
   (`check_port: 8091`, `directory: "/home/hpp/alliancebrag"`).
6. Si hay un repo de GitHub asociado, generar una SSH key dedicada
   (`id_ed25519_alliancebrag_github`) y alias `github-alliancebrag` en
   `~/.ssh/config` — **no usar tokens HTTPS**, este servidor usa una
   keypair SSH por proyecto (mismo patrón que `saverstore`, `amazon`,
   `formulauno`, `mcv`).
7. Confirmar que aparece "online" en el tablero (`https://192.168.1.71/`).

Caddy/HTTPS **no** está configurado para este proyecto — se accede
directo por `http://192.168.1.71:8091`, igual que el resto de los
proyectos (solo el tablero, puerto 9000, está detrás de Caddy).
