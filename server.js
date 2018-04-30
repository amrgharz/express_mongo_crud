const express =  require ('express');
const bodyparser = require ('body-parser')
const app = express ();
const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://amrgharz:a01234567810m@ds263639.mlab.com:63639/star-wars' , (err , client)=>{
    if (err) return console.log(err)
    db = client.db('star-wars')
    app.listen(3000 , function(){
        console.log('you are listening on posrt 3000')
    })
    
})

app.use(bodyparser.urlencoded({extended:true}))


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.set('view engine', 'ejs')