import { errorHandler } from '../utils/error.js';
import Post from '../models/post.model.js';

// Create a new post
export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Get posts (supports filters and single post fetching)
export const getposts = async (req, res, next) => {
  const { category, userId, slug, postId, searchTerm } = req.query;

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(userId && { userId }),
      ...(category && { category }),
      ...(slug && { slug }),
      ...(postId && { _id: postId }), // ✅ Corrected: was previously using userId by mistake
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection }) // ✅ Correct: use updatedAt
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a post
export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to delete a post'));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted.');
  } catch (error) {
    next(error);
  }
};



export const updatepost = async (req, res, next) => {
    if(!req.user.isAdmin || req.user.id!== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update a post'));
    }
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    content:req.body.content,
                    category:req.body.category,
                    image:req.body.image,
                }
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    }catch (error){
        next(error)
    }
}
