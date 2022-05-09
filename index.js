const {google} = require('googleapis')
const keys = require('./credentials.json')

// https://nodejs.org/
// https://code.visualstudio.com/
// https://developers.google.com/sheets/api/quickstart/nodejs
// console.developers.google.com
// https://developers.google.com/identity/protocols/googlescopes

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)


client.authorize(function(err, tokens) {
    if(err){
        console.log(err)
        return
    } else {
        console.log('Connected!')
        gsrun(client)
    }

})


async function gsrun(cl){

    const gsapi = google.sheets({version:'v4', auth: cl})

    const opt = {
        spreadsheetId: '1lrGt8C9gjrabhVjGYoFh-q40rLuRHz6u9vRZqVeLG-c',
        //range: 'cinema!A1:J11'
        range: 'cinema!A2:J11'
    }

    let data = await gsapi.spreadsheets.values.get(opt)
    console.log(data.data.values)
    let dataArray = data.data.values

    dataArray = dataArray.map(function(r){
        while(r.lenght<10){
            r.push(null)
            //r.push('')
        }
        return r
    })
    console.log(dataArray)

    let newDataArray = dataArray.map(function(r){
        r.push(r[0] + '-' + r[1] + '-' + r[2] + '-' + r[3] + '-' + r[4] + '-' + r[5] + '-' + r[6] + '-' + r[7] + '-' + r[8] + '-' + r[9]) // cria uma nova coluna
        return r
    })
    //console.log(newDataArray)

    const updateOptions = {
        spreadsheetId: '1lrGt8C9gjrabhVjGYoFh-q40rLuRHz6u9vRZqVeLG-c',
        //range: 'cinema!A1:J11'
        range: 'cinema!A12', // Isso responde uma pergunta que fiz no STACKOVERFLOW
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray} // Aqui você está chamando os mesmos valores da planilha, ou seja, vai duplicar (newDataArray)
    }

    let res = await gsapi.spreadsheets.values.update(updateOptions)
    //console.log(res)

}