/* @flow */
export default function buildFilename ({name, version}: Object, hash: boolean = false, extension: string = 'js'): string {
  const hashName = extension === 'css' ? '[contenthash]' : '[hash]'
  return `${name}.${hash ? hashName : version}.${extension}`
}
