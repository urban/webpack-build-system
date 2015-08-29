/* @flow */
export default function buildFilename ({name, version}: Object, extension: string = 'js'): string {
  // const hashName = extension === 'css' ? '[contenthash]' : '[hash]'
  return `${name}.${version}.${extension}`
}
