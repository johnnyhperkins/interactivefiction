import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

export function safeJsonParse (str) {
  try {
    return [null, JSON.parse(str)]
  } catch (err) {
    return [err]
  }
}

export function convertToHtml (sections) {
  let html = ''
  sections.forEach(section => {
    html += `<h3 style='text-align:center;'>${section.firstLine}</h3><table><tr>`
    section.stanzas.forEach(stanza => {
      const [err, body] = safeJsonParse(stanza.body)
      if (err) return console.error(err)
      const stanzaBodyState = convertFromRaw(body)
      const stanzaBodyHtml = stateToHTML(stanzaBodyState)
      html += `<td style="vertical-align: top; width: 30%; padding: 0 10px 0 0;">
        <p><em>${stanza.leadWord}</em></p>
        ${stanzaBodyHtml}
        </td>`
    })
    html += '</tr></table>'
  })
  html += '</div>'

  return html
}
