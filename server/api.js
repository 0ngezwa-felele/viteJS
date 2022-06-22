const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
    app.get('/api/test',function(req, res){
        res.json({
            name:'ongi'
        })
    })

    app.post('/api/register',async function(req, res){
    const {username, password} = req.body
    var user = await db.oneOrNone(`select * from love_user where username = $1`,[username])
    if(user == null){
        await db.none(`insert into love_user(username, password) values($1,$2)`,[username, password])
        
         console.log('inserted');
    }else{
       console.log('failed');
        
    }
    })

    app.post('/api/login', async function(req,res){
        const {username, password} = req.body
        var logUser = await db.oneOrNone(`select * from love_user where username = $1`,[username])
        if(logUser == null){
            console.log('no user');
            return res.json({
                token: null
            })
        }else{
            jwt.sign({logUser},'secret', function(err,token){
                return res.json({
                    token: token
                })
            })
            console.log('in');
        }
    })
}