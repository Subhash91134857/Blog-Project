import { response } from "express";
import Comment from "../models/comment.js"

export const newComment = async(request,response) => {
    
  try {
      const newcomment = await new Comment(request.body);
      await newcomment.save();
      response.status(200).json({msg:"Comment saved"})
      
  } catch (error) {
      response.status(500).json({msg:error.message})
    
  }

}

export const getAllComments = async(request,response) => {
  try {
    const comments = await Comment.find({ postId: request.params.id });
    console.log(comments);
    response.status(200).json(comments)
  } catch (error) {
    response.status(500).json({msg:error.msg})
  }

}

export const deleteComment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);
    await Comment.findByIdAndDelete(request.params.id)
    return response.status(200).json({msg:'Comment Deleted'})
  } catch (error) {
    response.status(500).json({ error: error.msg });
    
  }
}