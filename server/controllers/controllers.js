const express = require('express');
const router = require('express').Router();

const UserController = require('./user.controller');

const userController = new UserController(router);

module.exports = router;