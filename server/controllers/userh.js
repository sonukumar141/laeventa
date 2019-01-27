const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');	
const config = require('../config');

exports.auth =  function(req, res){
	const {email, password} = req.body;

	if(!password || !email) {
		return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
	}

	Userh.findOne({email}, function(err, userh) {
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(!userh){
			return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
		}
		if(userh.hasSamePassword(password)){
			// Jwt token
			const token = jwt.sign({
  			userId: userh.id,
			  username: userh.username,
			  category: userh.category
			}, config.SECRET, { expiresIn: '1h' });

			return res.json(token);

		}else {
			return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
		}
	});
}

exports.signup =  function(req, res){

    const {category, businessname, username, email, mobile, password, passwordConfirmation} = req.body;

    if(!email || !mobile || !password){
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email, mobile and password'}]});
    }

	if(password != passwordConfirmation) {
		return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not as confirmation'}]});
	}

    Userh.findOne({email}, function(err, existingUserh){
        if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        
		if(existingUserh){
			return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'Email already registered'}]});
		}

		const userh = new Userh({
			category,
            businessname,
			username,
            email,
            mobile,
			password
        });
        
        userh.save(function(err){
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
		const userh = parseToken(token);

		Userh.findById(userh.userId, function(err, userh){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(userh) {
				res.locals.userh = userh;
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