// src/utils/date.js
export function formatDDMMYYYY(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // months are zero-based
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}
