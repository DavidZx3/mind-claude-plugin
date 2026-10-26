#!/usr/bin/env node
// Mind para Claude: arranca la app de escritorio Mind instalada en este PC como servidor MCP
// (`Mind.exe --mcp`) y le pasa la entrada y la salida tal cual. No abre ninguna conexión de red:
// Mind lee las notas de su base de datos local y contesta por stdio.
//
// Es el mismo archivo en la extensión de Claude Desktop (Mind.mcpb) y en el plugin del directorio.
'use strict';

const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const DOWNLOAD = 'https://thorly.dev/mind';

/** Dónde instala Mind su instalador (Velopack): %LocalAppData%\MindByThorly\current\Mind.exe. */
function findMind() {
  const candidates = [];
  // Para probar con otra copia de Mind (por ejemplo, una compilada en el PC)
  if (process.env.MIND_EXE) candidates.push(process.env.MIND_EXE);
  const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
  candidates.push(path.join(localAppData, 'MindByThorly', 'current', 'Mind.exe'));

  return candidates.find((file) => {
    try {
      return fs.statSync(file).isFile();
    } catch {
      return false;
    }
  });
}

function fail(message) {
  // stderr es lo que Claude guarda en su registro del servidor; stdout es solo para el protocolo
  process.stderr.write(`[Mind] ${message}\n`);
  process.exit(1);
}

if (process.platform !== 'win32') {
  fail(`Mind es una app de Windows. Descárgala en ${DOWNLOAD}`);
}

const exe = findMind();
if (!exe) {
  fail(`No encuentro Mind en este PC. Instálala desde ${DOWNLOAD} y vuelve a abrir Claude.`);
}

const mind = spawn(exe, ['--mcp'], { stdio: 'inherit', windowsHide: true });

mind.on('error', (error) => fail(`No se pudo abrir Mind (${exe}): ${error.message}`));
mind.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));

// Si Claude cierra el servidor, Mind se cierra con él
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => mind.kill());
}
