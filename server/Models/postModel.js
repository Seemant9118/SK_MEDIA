import mongoose from "mongoose";
// {mongo} hataya hai import se
const postSchema = mongoose.Schema({
    userId: {type:String , required: true},
    desc: String,
    likes: [],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String,
},
{
    timestamp: true
});


var PostModel = mongoose.model("Posts" , postSchema)
export default PostModel;