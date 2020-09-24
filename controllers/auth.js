const User = require('../models/User');
const { signInValidator, signUpValidator } = require('../validation/index');
const jwt = require('jsonwebtoken');



exports.signUp = async (req, res) => {
    const [valid, errors] = signUpValidator(req.body);
    if (!valid) return res.status(400).json({ errors });

    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(403).json({ error: 'Email is taken' });

        const user = new User(req.body);

        await user.save(user.encryptPassword(req.body.password));

        res.status(200).json({message:'Success! Please Login'})        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


exports.signIn = async (req, res) => {
    const [valid, errors] = signInValidator(req.body);
    if (!valid) return res.status(400).json({ errors });

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'User with that email does not Exist' });

        if (!user.authenticate(password)) return res.status(401).json({ error: 'Email and Password does not match' });            
        
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, name } = user;

        return res.json({ token, user: { _id, name, email: user.email } });

    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'User with that email does not Exist' });
    }
}

exports.signOut = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'successfully signout' });
}


const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return false;
    }
}

exports.requireAuth = async (req, res,next) => {
    const cookieToken = req.cookies.t;
 
    if (cookieToken && verifyToken(cookieToken)) {

        const user = await User.findById(verifyToken(cookieToken)._id);

        user.password = undefined;
        req.user = user;

        return next();
    }
    const auth = req.headers.authorizations;
    if (!auth) return res.status(401).json({ msg: 'unauthorized' });

    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'unauthorized' });

    const decodedToken = verifyToken(token);
    if (!decodedToken) return res.status(401).json({ msg: 'unauthorized' });

    const user = await User.findById(verifyToken(cookieToken)._id);
 
    user.password = undefined;
    req.user = user;
    
    next();
}
 
exports.isSignIn = async (req, res) => {
    if (req.user) return res.json(req.user);
    return res.status(400).json({ error: 'Failed' });
    
}

