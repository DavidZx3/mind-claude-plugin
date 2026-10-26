# Mind para Claude

Conecta Claude con **Mind**, la app de notas y documentación de [Thorly](https://thorly.dev/mind) para Windows. Con este plugin, Claude puede buscar en todas tus notas, leer una página entera con su ruta y sus subpáginas, ver tus espacios y el árbol de páginas de cada uno, y crear páginas nuevas en Markdown cuando se lo pides.

![Mind](icon.png)

## Requisitos

- Windows 10 u 11.
- [Mind para Windows](https://thorly.dev/mind) instalado (gratis).
- Node.js 18 o posterior, para el lanzador del servidor.

## Instalar

En Claude Code:

```
/plugin install mind-by-thorly --marketplace DavidZx3/mind-claude-plugin
```

En Claude (chat y Cowork): Personalizar → Plugins → Añadir marketplace → `DavidZx3/mind-claude-plugin`, e instala «Mind».

## Qué hace y qué ejecuta

Este plugin no trae la app: trae un lanzador pequeño y legible, `server/mind-mcp.js`, y una skill que explica a Claude cuándo usar las herramientas.

- El lanzador busca Mind en `%LOCALAPPDATA%\MindByThorly\current\Mind.exe`, que es donde la instala su instalador, y la arranca como servidor MCP con `Mind.exe --mcp`. Si existe la variable `MIND_EXE`, usa esa ruta en su lugar (sirve para probar otra copia de Mind).
- La entrada y la salida del lanzador pasan tal cual a Mind, que habla MCP (JSON-RPC por stdio).
- Mind lee tus notas de su base de datos local (`%LOCALAPPDATA%\Thorly\Mind`) y contesta. **Ni el lanzador ni el servidor abren conexiones de red**: no se envía nada a Thorly ni a ningún otro servidor.
- `crear_nota` escribe una página nueva en tu Mind; nada más modifica ni borra datos.
- La Bóveda (cifrada) y las notas compartidas de los equipos nunca salen.

## Herramientas

| Herramienta | Qué hace | Modifica datos |
| --- | --- | --- |
| `buscar_notas` | Busca en el título y el texto de todas las páginas | No |
| `leer_nota` | Lee una página en Markdown con su ruta y subpáginas | No |
| `listar_notas` | Lista el árbol de páginas de un espacio | No |
| `listar_espacios` | Lista los espacios y cuántas páginas tiene cada uno | No |
| `crear_nota` | Crea una página con título y Markdown | Sí, añade una página |

## Dónde funciona

En Claude Code y en Cowork cuando la sesión corre en tu PC. En el chat de Claude Desktop, instala la extensión `Mind.mcpb` de [thorly.dev/mind](https://thorly.dev/mind) o pulsa «Conectar» en Mind → Tienda → Conecta tu IA.

## Privacidad y soporte

Todo el tratamiento de datos ocurre en tu PC; el plugin no recoge ni comparte información. Soporte y contacto en [thorly.dev](https://thorly.dev).
