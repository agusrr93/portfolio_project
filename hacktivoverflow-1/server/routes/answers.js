var express = require('express');
var router = express.Router();
const {add, update, upVote, downVote} = require('../controllers/answers')
const {isLogin, isSelf, isSelfComment, isAnswerUpVote, isAnswerDownVote} = require('../middlewares/auth')

router.post('/', isLogin, add)
router.put('/:id', isLogin, isSelfComment, update)
router.post('/upvote/:id', isLogin, isAnswerUpVote, upVote)
router.post('/downvote/:id', isLogin, isAnswerDownVote, downVote)
// router.delete('/:id', isLogin, isSelfComment, del)
module.exports = router;
