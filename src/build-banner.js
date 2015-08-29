/* @flow */
export default function buildBanner ({ name, version, author, license }: Object): string {
  const now = new Date()
  const year = now.getFullYear()
  const dateStamp = now.toISOString()

  return `
${name} v${version}

Copyright ${year} ${author}
Released under the ${license} license

Date: ${dateStamp}
`

}
