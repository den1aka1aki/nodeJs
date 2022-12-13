const express = require('express')
const chalk = require('chalk')
const {addNote, getNotes} = require('./notes.controller')
const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.urlencoded({
    extended: true
}))

app.get('/', async (req, res)=> {
  res.render('index',{
      title:'Express App',
      notes: await getNotes()
  })
})

app.post('/', async(req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title:'Express App',
        notes: await getNotes()
    })
})

// const server = http.createServer(async (req, res)=>{
//   if(req.method === 'GET'){
//     const content = await fs.readFile(path.join(basePath, 'index.ejs'))
//       res.writeHead(200, {
//           'Content-Type': 'text/html'
//       })
//       res.end(content)
//   } else if(req.method==='POST'){
//       const body = []
//       res.writeHead( 200, {
//           'Content-Type': 'text/plane; charset=utf-8'
//       })
//       req.on('data', data => {
//          body.push(Buffer.from(data))
//       })
//       req.on('end', () => {
//           const title = body.toString().split('=')[1].replaceAll('+', ' ')
//             addNote(title)
//           res.end(`Title = ${title}`)
//       })
//
//   }
// })
app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})
