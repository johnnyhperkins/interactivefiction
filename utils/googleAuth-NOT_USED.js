// @NOTE: KEEPING IN THE EVENT I WANT TO CONNECT TO A GOOGLE SERVICE--THIS CODE IS ONLY
// PARTIALLY FUNCTIONAL

// const fs = require('fs')
// const util = require('util')
// const readline = require('readline')
// const { google } = require('googleapis')
// const path = require('path')

// const SCOPES = ['https://www.googleapis.com/auth/drive']
// const TOKEN_PATH = path.join(__dirname, '../token.json')
// const CREDENTIALS_PATH = path.join(__dirname, '../credentials.json')
// const readFile = util.promisify(fs.readFile)

// function getNewToken (oAuth2Client) {
//   return new Promise((resolve, reject) => {
//     const authUrl = oAuth2Client.generateAuthUrl({
//       // access_type: 'offline',
//       scope: SCOPES
//     })
//     console.log('Authorize this app by visiting this url:', authUrl)
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     })
//     rl.question('Enter the code from that page here: ', (code) => {
//       rl.close()
//       oAuth2Client.getToken(code, (err, token) => {
//         if (err) return reject(console.error('Error retrieving access token', err))
//         oAuth2Client.setCredentials(token)
//         // Store the token to disk for later program executions
//         fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//           if (err) console.error(err)
//           console.log('Token stored to', TOKEN_PATH)
//         })
//         // debugger
//         return resolve(oAuth2Client)
//       })
//     })
//   })
// }

// module.exports = async function sendPoemToGoogleDrive (title, payload) {
//   const credentials = JSON.parse(await readFile(CREDENTIALS_PATH))
//   const { client_secret: clientSecret, client_id: clientId, redirect_uris: redirectUris } = credentials.installed
//   const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0])
//   google.options({ auth: oAuth2Client })

//   try {
//     const token = JSON.parse(await readFile(TOKEN_PATH))
//     const auth = oAuth2Client.setCredentials(token)
//     const drive = google.drive({ version: 'v3', auth })
//     const res = await drive.files.create({
//       requestBody: {
//         name: title,
//         mimeType: 'text/plain'
//       },
//       media: {
//         mimeType: 'text/html',
//         body: payload
//       }
//     })

//     console.log({ body: JSON.stringify(res) })
//   } catch (err) {
//     console.log('No token, attempting to reauthorize', err)
//     return getNewToken(oAuth2Client)
//   }
// }
