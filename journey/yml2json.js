// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const yaml = require('js-yaml');
const fs   = require('fs');

try {
  const doc = yaml.load(fs.readFileSync(process.argv[2], 'utf8'));
  console.log(JSON.stringify(doc,null,4));
} catch (e) {
  console.log(e);
}

