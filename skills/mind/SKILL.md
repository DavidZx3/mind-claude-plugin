---
name: mind
description: Usa las notas de Mind del usuario (apuntes, proyectos, actas, documentación) para responder sobre su trabajo, y crea páginas en Mind cuando lo pida.
---

# Notas de Mind

Mind es la app de notas del usuario en Windows. El servidor MCP `mind` de este plugin da cinco herramientas:

- `buscar_notas`: busca por palabras en el título y el texto de todas las páginas. Devuelve el título, un trozo del texto y el id de cada página.
- `leer_nota`: lee una página entera en Markdown, con su ruta y sus subpáginas, a partir de su id.
- `listar_notas`: el árbol de páginas de un espacio, con título e id.
- `listar_espacios`: los espacios del usuario (trabajo, estudios, personal…) y cuántas páginas tiene cada uno.
- `crear_nota`: crea una página con título y contenido en Markdown, opcionalmente dentro de otra página o en otro espacio.

## Cuándo usarlas

- Si el usuario pregunta por su trabajo, un proyecto, un cliente, una reunión o algo que pudo apuntar, busca primero con `buscar_notas` usando dos o tres palabras clave, y lee las páginas que encajen con `leer_nota` antes de responder.
- Al responder con datos de sus notas, di el título de la página de donde sale cada dato.
- Si una búsqueda no encuentra nada, prueba con sinónimos o con menos palabras antes de decir que no está.
- Crea páginas con `crear_nota` solo cuando el usuario lo pida. Usa Markdown: encabezados, listas, tareas (`- [ ]`), tablas y bloques de código.

## Qué no hay en Mind

La Bóveda (páginas y contraseñas cifradas) y las notas compartidas de los equipos no están disponibles por aquí.
