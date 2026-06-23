# Cómo publicar alliancebrag (sitio estático HTML/CSS/JS)

Puerto asignado: **8091** (próximo libre tras 8080-8090 — ver
`tablero/projects.json` para la lista completa).

Este sitio es estático (HTML/CSS/JS sin backend), así que no hace falta
Flask ni Node: alcanza con un servidor HTTP simple que sirva los archivos
del directorio. El patrón sigue el de los demás proyectos del servidor
(cron `@reboot` + entrada en el tablero), igual que se hizo con saverstore.

## 1. Estructura esperada

```
alliancebrag/
├── server.py        # servidor estático (ya creado)
├── index.html
├── css/...
├── js/...
└── logs/
    └── portal.log    # se crea solo al arrancar
```

## 2. `server.py`

Ya está creado en `/home/hpp/alliancebrag/server.py`:

```python
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
handler = partial(SimpleHTTPRequestHandler, directory=str(__file__).rsplit("/", 1)[0])
ThreadingHTTPServer(("0.0.0.0", port), handler).serve_forever()
```

Probar a mano antes de poner el cron:

```bash
cd /home/hpp/alliancebrag
python3 server.py 8091
# abrir http://192.168.1.71:8091 desde otra máquina de la LAN
```

Si carga bien, `Ctrl+C` y seguir con el arranque automático.

## 3. Arranque automático (cron `@reboot`)

Agregar una línea al crontab del usuario `hpp` (`crontab -e`):

```
@reboot cd /home/hpp/alliancebrag && python3 server.py 8091 > logs/portal.log 2>&1
```

Para levantarlo ahora sin reiniciar el servidor:

```bash
cd /home/hpp/alliancebrag && nohup python3 server.py 8091 > logs/portal.log 2>&1 &
disown
```

Verificar que quedó escuchando:

```bash
ss -ltnp | grep 8091
```

## 4. Firewall (UFW)

```bash
sudo ufw allow from 192.168.1.0/24 to any port 8091 proto tcp comment 'AllianceBrag panel'
sudo ufw status numbered | grep 8091
```

## 5. Alta en el tablero (`/home/hpp/tablero/projects.json`)

Agregar un objeto a la lista (el archivo se relee en cada request del
tablero, no hace falta reiniciar `server.py 9000` del tablero):

```json
{
  "id": "alliancebrag",
  "name": "AllianceBrag",
  "description": "Sitio AllianceBrag (HTML/CSS/JS estático)",
  "url": "http://192.168.1.71:8091",
  "check_host": "localhost",
  "check_port": 8091,
  "directory": "/home/hpp/alliancebrag",
  "tags": ["HTML", "CSS", "JS", "Static"],
  "type": "web",
  "skills": []
}
```

## 6. Repo Git (si corresponde)

Si este sitio va a vivir en un repo de GitHub, seguir el mismo patrón
SSH dedicado que se usó para saverstore (no hay tokens HTTPS en este
servidor):

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_alliancebrag_github -N "" -C "alliancebrag@srvnvidia"
```

Agregar al `~/.ssh/config`:

```
Host github-alliancebrag
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_alliancebrag_github
    IdentitiesOnly yes
```

Pegar la clave pública (`cat ~/.ssh/id_ed25519_alliancebrag_github.pub`)
como Deploy Key en el repo de GitHub correspondiente (Settings → Deploy
keys → Add deploy key, con "Allow write access" si va a hacer push).
Luego:

```bash
cd /home/hpp/alliancebrag
git init
git remote add origin git@github-alliancebrag:ORG/alliancebrag.git
```

## 7. Acceso desde la web

Hoy en este servidor **solo el tablero** (puerto 9000) está detrás de
Caddy con HTTPS (`https://192.168.1.71/`). El resto de los proyectos
—incluido alliancebrag— se accede **directo por IP:puerto**:

```
http://192.168.1.71:8091
```

## 8. Checklist final

- [ ] `server.py` corriendo y respondiendo en `http://192.168.1.71:8091`
- [ ] regla UFW agregada para 8091 (solo LAN)
- [ ] línea `@reboot` agregada al crontab de `hpp`
- [ ] entrada agregada en `tablero/projects.json`
- [ ] (si aplica) repo Git conectado con SSH key dedicada
- [ ] aparece "online" en el panel del tablero (`https://192.168.1.71/`)
