const fs = require('fs');
const growlityPkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const themePkg = JSON.parse(fs.readFileSync('../new-theme/package.json', 'utf8'));

// Merge dependencies
growlityPkg.dependencies = {
  ...growlityPkg.dependencies,
  ...themePkg.dependencies
};

// Sort dependencies
const sortedDeps = {};
Object.keys(growlityPkg.dependencies).sort().forEach(k => {
  sortedDeps[k] = growlityPkg.dependencies[k];
});
growlityPkg.dependencies = sortedDeps;

fs.writeFileSync('./package.json', JSON.stringify(growlityPkg, null, 2));
console.log('Dependencies merged!');
