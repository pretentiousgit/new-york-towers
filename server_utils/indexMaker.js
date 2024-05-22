import fs from 'fs';
import path from 'path';

const folder = `${path.resolve()}/`;
const scriptName = 'indexMaker.js';

console.log(folder);
console.log(scriptName);

/*
  This reads all files in a directory
  and generates an index file for imports elsewhere
*/

/* == sample output: == /*

    import FILENAME from './filename.js'
    export default {
      'FILENAME': FILENAME,
    }

*/

fs.readdir(folder, (err, files) => {
  if (err) {
    throw new Error('File read error ', err);
  }

  let importBlock = '';
  let exportBlock = '';

  files.forEach((file) => {
    // early return if we're looking at an already-complete index
    if (file.indexOf('index') !== -1) { return; }

    console.log(file);
    const name = file.substring(0, file.indexOf('.'));
    importBlock += `import ${name} from './${name}';\n`;
    exportBlock += `  '${name}': ${name},\n`;
  });

  // remove final trailing comma
  const finalComma = exportBlock.lastIndexOf(',');
  exportBlock = exportBlock.substring(0, finalComma);
  exportBlock = `${exportBlock}\n`;

  // pack exports for index.js file
  exportBlock = `export default {\n${exportBlock}};\n`;

  // console.log(importBlock);
  // console.log(exportBlock);
  const file = `${importBlock}\n${exportBlock}`;
  fs.writeFileSync(`${folder}/index.js`, file, () => {
    'Write complete';
  });
});

/*
    pseudocode:

    for each file within this directory
    get the name and import it
    build an export tree for calling elsewhere
*/
