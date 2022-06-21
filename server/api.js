module.exports = (app, db) => {
    app.get('/api/test',function(req, res){
        res.json({
            name:'ongi'
        })
    })

    app.post('/api/register',async function(req, res){
    const {username, password} = req.body
    var user = await db.oneOrNone(`select * from love_user where username = $1`,[username])
    if(user == ''){
        await db.none(`insert into love_user(username, password) values($1,$2)`,[username, password])
        
         console.log('inserted');
    }else{
       console.log('failed');
        
    }
    })
}