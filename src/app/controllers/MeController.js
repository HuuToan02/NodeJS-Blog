const BlogPost = require('../models/BlogPost');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class MeController {

    // [GET] /me/stored/posts
    stored(req, res, next) {
        Promise.all([BlogPost.find({}), BlogPost.countDocumentsDeleted()])
            .then(([posts, deletedCount]) =>
                res.render('me/stored-post', {
                    deletedCount,
                    posts: multipleMongooseToObject(posts)
                })
            )
            .catch(next);
    }

    // [GET] /me/stored/posts
    trash(req, res, next) {
        BlogPost.findDeleted({})
            .then(posts => res.render('me/trash-post', {
                posts: multipleMongooseToObject(posts)
            }))
            .catch(next)
    }
}

module.exports = new MeController;