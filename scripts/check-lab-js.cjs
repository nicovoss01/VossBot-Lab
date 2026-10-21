const fs = require('node:fs');
const vm = require('node:vm');
const files = ['index.html', 'apps/homepage/index.html', 'apps/lab/index.html'];
let total = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(script => script.trim());
  scripts.forEach((script, index) => {
    new vm.Script(script, { filename: `${file}#inline-${index}` });
  });
  total += scripts.length;
  console.log(`Validated ${scripts.length} inline script(s) in ${file}.`);
}
console.log(`Validated ${total} inline script(s) total.`);
