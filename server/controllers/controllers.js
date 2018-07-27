const express = require('express');
const router = require('express').Router();

const UserController = require('./user.controller');
const ListController = require('./list.controller');

const userController = new UserController(router);
const listController = new ListController(router);

module.exports = router;