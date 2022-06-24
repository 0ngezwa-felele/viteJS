const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
    app.get('/api/test', function (req, res) {
        res.json({
            name: 'ongi'
        })
    })

    app.post('/api/register', async function (req, res) {
        try {
            const { username, password } = req.body;
            if (!username) {
                throw Error('Username is not provided!')
            }
            var user = await db.oneOrNone(`select * from love_user where username = $1`, [username])
            if (user == null) {
                await db.none(`insert into love_user(username, password) values($1,$2)`, [username, password])

                console.log('inserted');

                res.json({
                    success: 'Done!'
                })
            } else {
                throw Error('User already exist');

            }

            res.json({
                success: 'Done!'
            })
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    })

    app.post('/api/login', async function (req, res) {
        try {
            const { username, password } = req.body
            if(!username){
                throw Error('Username is not provided')
            }
            var logUser = await db.oneOrNone(`select * from love_user where username = $1`, [username])
            if (logUser == null) {
                console.log('no user');
                return res.json({
                    token: null
                })
            } else {
                jwt.sign({ logUser }, 'secret', function (err, token) {
                    return res.json({
                        token: token
                    })
                })
                console.log('in');
                res.json({
                    success: 'Done!'
                })
            }
            // if(username == username){
            //     throw Error('Logged successfully!');
            // }
            res.json({
                success: 'Done!'
            })
            
        } catch (error) {
            res.status(500).json({
                error:error.message
            })
        }

    })
}