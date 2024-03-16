
const mongoose=require('mongoose');

const bookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            unique: true,
            required:true
    },
        author:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        availability:{
            type:String,
            required:true
        }
        },{
        timeStamp:true
    });

const Book = mongoose.model('Book',bookSchema);
module.exports=Book;