var router = require('express').Router();

router.use('/users', require('./user/routes'));
router.use('/words', require('./word/routes'));

module.exports = router;