const { readJSON, writeJSON } = require('../utils/fileUtils');
const prefFile = './data/preferences.json';

function setPreference(key, value) {
  const preferences = readJSON(prefFile);
  preferences[key] = value;
  writeJSON(prefFile, preferences);
  console.log(`✅ Preference '${key}' updated to '${value}'`);
}

function getPreferences() {
  return readJSON(prefFile);
}

module.exports = { setPreference, getPreferences };
