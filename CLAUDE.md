# AllianceBrag — memoria del proyecto

> **APAGADO el 2026-10-16** a pedido de Ariel (proyecto dormido): se comentó su `@reboot` en el crontab, se sacó la fila 8091 del watchdog y se detuvo el portal. Código y datos intactos. **Para volver a levantarlo:** descomentar el `@reboot` (`crontab -e`, buscar «APAGADO 2026-10-16») y la fila 8091 en `/home/hpp/agente/scripts/levantar_portales.sh`; el watchdog lo levanta en ≤10 min. Repo `DasLatam/alliancebrag`: público y en GitHub Pages desde 2026-10-22 (ver abajo).

Sitio estático (HTML/CSS/JS, sin backend) para AllianceBrag.

## Infraestructura

- **Puerto asignado: 8091** (próximo libre tras 8080-8090 — ver
  `/home/hpp/tablero/projects.json` para la lista completa de puertos en uso).
- **`server.py`** ya creado: servidor estático simple
  (`ThreadingHTTPServer`), mismo patrón que `saverstore`.
- **Conexión Git:** lista — remoto `origin` ya apunta a
  `git@github-alliancebrag:DasLatam/alliancebrag.git` (rama `main`),
  con keypair SSH dedicada (`~/.ssh/id_ed25519_alliancebrag_github`,
  alias `github-alliancebrag` en `~/.ssh/config`). Contenido commiteado y
  pusheado a `main` (2026-06-23); local = remoto
  (verificado 2026-10-22).
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

## GitHub Pages (2026-10-22)

- **Publicado en https://daslatam.github.io/alliancebrag/** desde la rama `gh-pages`, carpeta raíz
  (`/`), sin build. `gh-pages` es copia de `main`: la mantiene `.github/workflows/pages.yml` en cada push (el token del server no tiene permiso de Pages para poner `main` como fuente; Pages se activó solo al empujar `gh-pages`). Pedido de Ariel: el repo `DasLatam/alliancebrag` pasó a
  **público** (antes privado: Pages gratis sólo sirve repos públicos) y se
  desarchivó. Auditoría previa de árbol e historial completo: sin claves ni
  datos personales (sólo el correo/teléfono/dirección comerciales que ya
  muestra el sitio y el correo de Ariel como autor de los commits).
- **Todo lo que se pushea a `main` queda público y se publica solo.** Nada de
  credenciales, `.env` ni datos de clientes en este repo. Este CLAUDE.md y
  PUBLICAR.md también se ven en el repo y en Pages.
- Las páginas viven bajo el prefijo `/alliancebrag/`: usar **sólo rutas relativas**
  (`assets/...`, `index.html`), nunca `/assets/...`. `404.html` se sirve en
  cualquier ruta inexistente, por eso lleva un `<base>` que sólo se activa en
  github.io. `.nojekyll` = se sirven los archivos tal cual.
- Verificar: `curl -sI https://daslatam.github.io/alliancebrag/` → 200.
