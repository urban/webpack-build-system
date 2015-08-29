export default function buildFilename ({name, version}, hash = false, extension = 'js') {
  const hashName = extension === 'css' ? '[contenthash]' : '[hash]'
  return `${name}.${hash ? hashname : version}.${extension}`
}
