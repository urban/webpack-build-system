export default function buildBanner (pack) {
  const now = new Date()
  const year = now.getFullYear()
  const dateStamp = now.toISOString()
  return (

`${pack.name} v${pack.version}

Copyright ${year} ${pack.author}
Released under the ${pack.license} license

Date: ${dateStamp}`

  )
}
