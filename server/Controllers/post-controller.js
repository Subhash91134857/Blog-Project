import { request } from "http";
import post from "../models/post.js";
import { response } from "express";

export const createPost = async(request,response) => {
    try {
        const Post = await new post(request.body);
        Post.save();

        return response.status(200).json('Post saved successfully'); 
    } catch (error) {
        return response.status(500).json(error);
    }
   
}

export const getAllPosts = async (request, response) => {
    let category = request.query.Category;
    let posts;
    try {
        if (category) {
            
            posts = await post.find({ categories: category });

        } else {
           posts = await post.find({});

            
        }
        return response.status(200).json(posts);
    } catch (error) {
        response.status(500).json({msg:error.message})
    }
}


export const getPost = async(request, response) => {
    try {
        const Post = await post.findById(request.params.id);
        return response.status(200).json(Post)
        
    } catch (error) {
        return response.status(500).json({msg:error.message})
    }
}

export const upDatePost = async (request, response) => {
    try {
        const Post = await post.findById(request.params.id);
        if (!Post) {
            return response.status(404).json({msg:'POST NOT FOUND!!!!!1'})
        }

        await post.findByIdAndUpdate(request.params.id, { $set: request.body })
        return response.status(200).json({msg:"Post Updated"})
    } catch (error) {
        response.status(500).json({ error: error.msg });
    }
}

export const deletPost = async (request, response) => {
    try {
        const Post = await post.findById(request.params.id);
        if (Post==null) {
            return response.status(404).json({ msg: 'POST NOT FOUND!!!!!1' })
        }
        await post.findByIdAndDelete(request.params.id);
        return response.status(200).json({msg:"Post deleted successfully"})
    } catch (error) {
        return response.status(500).json({ msg: error.msg })
    }
}