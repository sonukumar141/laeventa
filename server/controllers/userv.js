const Userv = require('../models/userv');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');	
const config = require('../config');

exports.auth =  function(req, res){
	const {email, password} = req.body;

	if(!password || !email) {
		return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
	}

	Userv.findOne({email}, function(err, userv) {
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(!userv){
			return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
		}
		if(userv.hasSamePassword(password)){
			// Jwt token
			const token = jwt.sign({
  			userId: userv.id,
			username: userv.username,
			category: userv.category,
			}, config.SECRET, { expiresIn: '1h' });

			return res.json(token);

		}else {
			return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
		}
	});
}

exports.signup =  function(req, res){

    const {category, businessname,  username, email, mobile, password, passwordConfirmation} = req.body;

    if(!email || !mobile || !password){
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email, mobile and password'}]});
    }

	if(password != passwordConfirmation) {
		return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not as confirmation'}]});
	}

    Userv.findOne({email}, function(err, existingUserv){
        if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        
		if(existingUserv){
			return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'Email already registered'}]});
		}
        

		const userv = new Userv({
			category,
			businessname,
			username,
            email,
            mobile,
			password
        });
        
        userv.save(function(err){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json({'registered': true});
		});
    });

}

exports.authMiddleware = function(req, res, next){ 
	const token = req.headers.authorization;

	if(token){
		const userv = parseToken(token);

		Userv.findById(userv.userId, function(err, userv){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(userv) {
				res.locals.userv = userv;
				next();
			}else{
				notAuthorized(res);
				
			}
		})

	}else{
		notAuthorized(res);
	}
}

function parseToken(token){

	return jwt.verify(token.split(' ')[1], config.SECRET);

}

function notAuthorized(res){
	return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to Login'}]});

}