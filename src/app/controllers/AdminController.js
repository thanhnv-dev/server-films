const Film = require('../models/Film');
const User = require('../models/User');
const Token = require('../../utils/token');

class AdminController {
    data(req, res) {
        Film.find({}, function (err, film) {
            res.send(film);
        });
    }

    login(req, res) {
        const data = req.body;

        console.log('Dữ liệu login được từ app: ', data);

        const email = data.email?.toLowerCase();

        const password = data.password;
        if (email === 'admin' || password === '123456tT@') {
            const token = Token.createToken(data);
            const resUser = {
                token: token,
                msg: 'Sign In Success',
            };
            res.header('Access-Control-Allow-Origin', '*');

            res.status(200).json({
                ...resUser,
            });
        } else {
            res.header('Access-Control-Allow-Origin', '*');

            res.status(400).json({
                msg: 'Tài khoản mật khẩu sai',
            });
        }
    }

    Films(req, res) {
        Film.find({})
            .then(film => {
                film = film.map(film => film.toObject());
                res.render('Films', {
                    film,
                });
            })
            .catch(err => console.log(err));
    }
    create(req, res) {
        res.render('films/create');
    }
    // [POST] /films/store
    // Create film web
    store(req, res) {
        // console.log(req.body)
        const film = new Film(req.body);
        film.save()
            .then(() => {
                res.redirect('/films');
            })
            .catch(() => {});
    }
    // [GET] /films/:id
    // View details film web
    details(req, res) {
        Film.find({_id: req.params._id}, (err, film) => {
            film = film.map(film => film.toObject());
            res.render('films/details', {
                film,
            });
        });
    }
    // [DELETE] /films/:_id
    delete(req, res) {
        Film.deleteOne({_id: req.params._id})
            .then(() => {
                res.redirect('/films');
            })
            .catch(err => {});
    }
    viewUsers(req, res) {
        User.find({})
            .then(user => {
                user = user.map(user => user.toObject());
                res.render('Users', {
                    user,
                });
            })
            .catch(err => console.log(err));
    }
}

module.exports = new AdminController();
