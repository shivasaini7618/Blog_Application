const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async(req ,res)=>{
  try{
    const {user , post} = req.body;
    const like = new Like({user , post});
    const savedLike = await like.save();

    // update post collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(post ,{$push: {likes:savedLike._id}}  , {
      new:true,
      runValidators:true
    })
    .populate('likes')
    .exec();
    console.log('Like saved');

    res.status(200).json(updatedPost);


  }catch(err){
    console.log(err);
    console.error(err)
   res.status(500).json('Internal server error')
}
}

// unlike 

exports.unlikepost = async(req , res)=>{
  try{
    const{post , like}= req.body;
    const deletedLike = await Like.findOneAndDelete({post:post , id:like});

    // update the post 
    const updatePost = await Post.findByIdAndUpdate(post , {$pull:{like:deletedLike}} ,{ new:true} , {runValidators:true}
    );

    res.status(200).json(updatePost);

  }catch(err){
    console.log(err);
    console.error(err)
   res.status(500).json('Internal server error')
  }
}