import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const token = '{{unsubscribe_url}}';
const expectedAnchor = new RegExp(
  `<a\\b[^>]*href=["']\\{\\{unsubscribe_url\\}\\}["'][^>]*>[\\s\\S]*?descadastr[\\s\\S]*?<\\/a>`,
  'i',
);

const ignoreRules = (await readFile(path.join(root, '.email-opt-out-ignore'), 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));

function isIgnored(relativePath) {
  return ignoreRules.some((rule) =>
    rule.endsWith('/') ? relativePath.startsWith(rule) : relativePath === rule,
  );
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(absolutePath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(absolutePath);
    }
  }

  return files;
}

const htmlFiles = await listHtmlFiles(root);
const emailFiles = htmlFiles
  .map((absolutePath) => ({
    absolutePath,
    relativePath: path.relative(root, absolutePath).split(path.sep).join('/'),
  }))
  .filter(({ relativePath }) => !isIgnored(relativePath))
  .sort((a, b) => a.relativePath.localeCompare(b.relativePath));

const failures = [];

for (const { absolutePath, relativePath } of emailFiles) {
  const html = await readFile(absolutePath, 'utf8');

  if (!html.includes(token) || !expectedAnchor.test(html)) {
    failures.push(`${relativePath}: falta o link visível href="${token}"`);
  }

  if (html.includes('%unsubscribe%')) {
    failures.push(`${relativePath}: ainda usa o placeholder legado %unsubscribe%`);
  }

  if (html.includes('LINK_DESCADASTRO')) {
    failures.push(`${relativePath}: ainda usa um placeholder de descadastro não suportado`);
  }

  if (html.includes('RESEND_UNSUBSCRIBE_URL')) {
    failures.push(`${relativePath}: usa o token de Broadcasts, mas o envio deste repo passa pelo Módulo Works`);
  }
}

if (failures.length > 0) {
  console.error('Falha na validação de opt-out:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${emailFiles.length} HTMLs de email têm opt-out válido do Módulo Works/Resend.`);
}
