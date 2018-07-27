const express = require('express');

const User = require('../models/user.model');
const List = require('../models/list.model');

class ListController {
    constructor(router) {
        router.route('/lists')
            .post(this.createList);
        router.route('/lists/:_id')
            .delete(this.deleteList);
        router.route('/lists/user')
            .put(this.updateUserLists);
    }

    async createList(req, res, next) {
        try {
            const list = await List.create(req.body.list);
            if(list !== null && list !== undefined) {
                console.log(req.body.id);
                const user = await User.update({'_id' : req.body.id}, {$push: {'lists' : list}}, {'new': true});
                if (user) {
                    const updatedUser = await User.findById(req.body.id);
                    res.status(200).json(updatedUser);
                }
            } else {
                res.status(500).json({'error' : 'Unable to create list'});
            }
        } catch(err) {
            next(err);
        }
    }

    async deleteList(req, res, next) {
        try {
            const list = await List.remove({'_id' : req.params._id})
            res.status(200).json(list);
        } catch(err) {
            next(err);
        }
    }

    async updateUserLists(req, res, next) {
        try {
            const user = await User.update({'_id' : req.params.id}, {$set: {'lists' : req.params.list}})

            if (user !== null && user !== undefined) {
                const updatedUser = await User.findById(req.params.id);
                res.status(200).json(updatedUser);
            } else {
                res.status(500).json({'error': 'unable to update user'});
            }
        } catch(err) {
            next(err);
        }
    }

}

module.exports = ListController;