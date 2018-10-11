const User = require('../../models/User');
const UserSession = require ('../../models/UserSession');

module.exports = (app) => {
    /*
    * Sign up
    */
    app.post('/api/account/signup', (req, res, next) => {
       const { body } = req;
       const { 
           firstName,
           lastName,
           password,
           houseNumber,
           streetName,
           addressType,
           city,
           state
       } = body;
       let  { email } = body;

       if(!firstName) {
           return res.send({
               success: false,
               message: 'Error: First name cannot be blank.'
           })
       }
       if(!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            })
        }
        if(!email) {
            return res.send({
                success: false,
                message: 'Error: Email name cannot be blank.'
            })
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Error: Password name cannot be blank.'
            })
        }
        if(!houseNumber) {
            return res.send({
                success: false,
                message: 'Error: House Number cannot be blank.'
            })
        }
        if(!streetName) {
            return res.send({
                success: false,
                message: 'Error: Street Name cannot be blank.'
            })
        }
        if(!addressType) {
            return res.send({
                success: false,
                message: 'Error: Address Type cannot be blank.'
            })
        }
        if(!city) {
            return res.send({
                success: false,
                message: 'Error: City cannot be blank.'
            })
        }
        if(!state) {
            return res.send({
                success: false,
                message: 'Error: State cannot be blank.'
            })
        }

    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email,
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
            });
        }
    });

        // Save the new user
        const newUser = new User();

        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.houseNumber = houseNumber;
        newUser.streetName = streetName;
        newUser.addressType = addressType;
        newUser.city = city;
        newUser.state = state;
    
        newUser.save((err, user) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
            });
        });
    }); // end of sign up 

    // Sign In
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { 
             password,
        } = body;
        let  { email } = body;

        if(!email) {
            return res.send({
                success: false,
                message: 'Error: Email name cannot be blank.'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Error: Password name cannot be blank.'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Username or Password'
                })
            }
            //invalid password
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password'
                });
            }
           
            // Otherwise connect the user
            const userSession = new UserSession();
            userSession.userId = user._id;
            
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true,
                    token: doc._id,
                    firstName: user.firstName,
                    houseNumber: user.houseNumber,
                    streetName: user.streetName,
                    addressType: user.addressType,
                    city: user.city,
                    state: user.state
                })
            });
        })
    });

    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        // Verify the token is one of a kind and not deleted
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({ 
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                });
            }
        });
    });

    app.get('/api/account/logout', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // Verify the token is one of a kind and it's not deleted.
        UserSession.findOneAndUpdate({
          _id: token,
          isDeleted: false
        }, {
          $set: {
            isDeleted:true
          }
        }, null, (err, sessions) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Good'
          });
        });
      });
};