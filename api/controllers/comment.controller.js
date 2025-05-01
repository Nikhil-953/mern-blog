import Comment from "../models/comment.model.js";


export const createComment = async (req, res,next) => {
    try{
        const { content,postId,userId} = req.body;

        if (userId !== req.user.id) {
            return res.status(403).json({ message: 'You are not allowed to create a comment' });
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();
        res.status(200).json(newComment);
    }catch (error) {
        next(error)
    }
}


export const getPostComments = async (req, res,next) => {
   try{
        const comments = await Comment.find({ postId: req.params.postId }).sort({ 
            createdAt: -1
        });
        res.status(200).json({ comments });
   }catch (error) {
        next(error)
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.likes.push(req.user.id);
        } else {
            comment.likes.splice(userIndex, 1);
        }
        
        // Always calculate from the likes array to avoid inconsistencies
        comment.numberOfLikes = comment.likes.length;
        
        await comment.save();
        res.status(200).json({
            likes: comment.likes,
            numberOfLikes: comment.numberOfLikes
        });
    } catch (error) {
        next(error);
    }
};

export const editComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        // Check if user is owner or admin
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to edit this comment' });
        }
        
        comment.content = content;
        await comment.save();
        
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        // Check if user is owner or admin
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
        
        await Comment.findByIdAndDelete(req.params.commentId);
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};


// Add to your comment controller (comment.controller.js)
export const getAllComments = async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const comments = await Comment.find()
        .sort({ createdAt: -1 })
        .limit(req.query.limit || 10)
        .skip(req.query.skip || 0);
        
      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  };