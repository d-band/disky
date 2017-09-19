const fs = require('fs');
const join = require('path').join;
const rimraf = require('rimraf');

const dist = join(__dirname, '../dist');
rimraf(dist, () => {
  fs.mkdirSync(dist);
  const html = fs.readFileSync(
    join(__dirname, '../src/app.html'),
    'utf8'
  );
  fs.writeFileSync(
    join(dist, 'app.html'),
    html.replace(/http:\/\/localhost:8000/g, '.'),
    'utf8'
  );
});
