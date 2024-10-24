const { response } = require('express');
const Post = require('../models/postModel');

// create Post
exports.createPost = async(req , res)=>{
  try{
    const {title ,body } = req.body;
    const newPost = new Post({title ,body});
    const response = await newPost.save();

    res.status(200).json(response);

  }catch(error){
    console.log(error);
    res.status(500).json('Internal server error');

  }
}

// fetch post 

exports.getPost = async (req , res)=>{
  try{
    const response = await Post.find().populate('comments').populate('likes').exec(); // agar populate nahi krate hai to only id show hongi 
    console.log('data fetch');
    res.status(200).json(response);

  }catch(error){
    console.error(error);
    res.status(500).json('Internal server error');
  }
}

// data fetch with the id 
exports.getPostById = async (req , res)=>{
  try{
    const postId = req.params.id;
    const response = await Post.findById(postId).populate('comments').populate('likes').exec();
    ;

    if(!response){
      return res.status(404).json('Post not found');
    }
    console.log('Data fetched');
    res.status(200).json(response)


  }catch(error){
    console.error(error);
    res.status(500).json('Internal server error');
  }
}


// post data updated
exports.updatePost = async(req , res)=>{
  try{
    const id = req.params.id;
   const postId = req.body;
   const response = await Post.findByIdAndUpdate(id , postId ,  {
    new:true,
    runValidators:true
   })
   if(!response){
    return res.status(404).json('Post not found');
  }
  console.log('Post Updated');
  res.status(200).json(response);
   

  }catch(error){
    console.error(error);
    res.status(500).json('Internal server error');
  }
}

// post deleted

exports.deletePost = async(req , res)=>{
  try{
    const id = req.params.id;
  const response = await Post.findByIdAndDelete(id);
  if(!response){
    console.log('Post not found')
    return res.status(404).json('Post not found');
  }
  console.log('Post deleted');
  res.status(200).json('Post delted successfull');
  }catch(error){
    console.log(error);
    res.status(500).json('Internal server error');
  }
}