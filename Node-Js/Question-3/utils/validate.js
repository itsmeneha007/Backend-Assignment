function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function isValidDate(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

module.exports = { isValidTitle, isValidDate };
