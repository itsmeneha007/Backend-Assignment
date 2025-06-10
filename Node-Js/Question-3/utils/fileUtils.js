const fs = require('fs');

function readJSON(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };
