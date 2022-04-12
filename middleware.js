exports.requireLogin = (req, res, next) => {
    if(req.seesion && req.seesion.user){
        return next();
    }
    else{
        return res.redirect('/login');
    }
}