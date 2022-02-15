const Comments = require('../models/comments');
const Joi = require('joi');

const idSchema = Joi.object({ id: Joi.required() });
const commentSchema = Joi.object({ comment: Joi.string().required() })    

// 코멘트 작성
const makeComment = async (req, res) => {
    try {
        const { id } = await idSchema.validateAsync(req.params);
        const { comment } = await commentSchema.validateAsync(req.body);
        const name = res.locals.user.name
        await Comments.create({
            id,
            name,
            comment
        });
        res.status(200).json({ ok: 'true', message: "등록 성공" });
    } catch (error) {
        res.status(400).json({ ok: 'false', message: "등록 실패" });
    }
};

// 코멘트 불러오기
const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comments.find({ id }).sort('-commentId').exec();
        res.status(200).json({ comments });
    } catch (error) {
        res.status(400).json({ ok: 'false' });
    }
};

// 코멘트 수정
const modifyComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        await Comments.updateOne({ commentId }, { $set: { comment }});
        res.status(200).send({ ok: 'true', message: "수정 성공" })
    } catch (error) {
        res.status(400).json({ ok: 'false', message: "수정 실패" })
    }
};

// 코멘트 삭제
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comments.deleteOne({ commentId });
        res.status(200).json({ ok: 'true', message: "삭제 성공"});
    } catch (error) {
        res.status(400).json({ ok: 'false', message: "삭제 실패" });
    }
};

module.exports = {
    makeComment,
    getComments,
    modifyComment,
    deleteComment
};