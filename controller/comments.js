const Comments = require('../models/comments');
const Joi = require('joi');

const commentSchema = Joi.object({
    id: Joi.required(),
    comment: Joi.string().required()
});

// 코멘트 작성
const makeComment = async (req, res) => {
    try {
        const { id, comment } = await commentSchema.validateAsync(req.body);
        const name = res.locals.user.name
        await Comments.create({
            id,
            name,
            comment
        });
        res.json({ ok: 'true' });
    } catch (error) {
        res.status(400).json({ ok: 'false' });
    }
};

// 코멘트 불러오기
const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comments.find({ id }).sort('-commentId').exec();
        res.json({ comments });
    } catch (error) {
        res.status(400).json({ ok: 'false' });
    }
};

// 코멘트 수정
const modifyComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        await Comment.updateOne({ commentId }, { $set: { comment }});
        res.status(200).send({ ok: 'true' })
    } catch (error) {
        res.status(400).json({ ok: 'false' })
    }
};

// 코멘트 삭제
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comments.deleteOne({ commentId });
        res.status(200).json({ ok: 'true '});
    } catch (error) {
        res.status(400).json({ ok: 'false' });
    }
};

module.exports = {
    makeComment,
    getComments,
    modifyComment,
    deleteComment
};