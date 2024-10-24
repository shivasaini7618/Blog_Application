
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.createComment = async (req , res)=>{
  try{
    const {post , user , body} = req.body;
    const comment = new Comment({post , user, body});
    const saveComment = await comment.save();

 
    // Find the post by id , add the new comments to its comments array
    const updatedPost = await Post.findByIdAndUpdate(post , {$push:{comments: saveComment.id}}  , {new:true})
     .populate('comments')
     // populate the comments array with comments documents
    .exec();


    res.status(200).json({
      success:true,
      post:updatedPost,
      msg:'Comments create '
    });

  }catch(error){
    console.log('Interanl server error')
    console.log(error);
    return res.status(500).json('Error while creating comments')

  }

}


exports.commentDelete = async (req , res)=>{
  try{const id = req.params.id;
      const response = await Comment.findByIdAndDelete(id);

      if(!response){
      return res.status(404).json('Comment not found')
     }
 
     res.status(200).json('Comment deleted');
    }catch(err){
    console.log(err);
    res.status(500).json('Internal server');
   }
}