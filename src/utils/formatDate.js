export function formatBr(data) {
  return data.split('-').reverse().join('/');
}

export function formatUS(data) {
  return data.split('/').reverse().join('-')
}