const { user } = require('firebase-functions/lib/providers/auth');
const {db}=require('../util/admin');

exports.getComments=(req,res)=>{
    db.collection('comments')
    .orderBy('createdAt','desc')
    .get()
    .then((data)=>{
      let comment=[];
      data.forEach((doc)=>{
        comment.push(doc.data());
      });
      return res.json(comment);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).json({
        error:err.code
      });
    })
  }

  exports.postOneComment=(req,res)=>{
    if(req.body.comment.trim()===''){
      return res.status(400).json({orderName:'Comment must not be empty.'})
    }
  const newComment={
    comment:req.body.comment,
    createdAt:new Date(),
    price:req.body.price,
    username:req.user.username
  
    
  }
  
  db.collection('comments').add(newComment).then((doc)=>{
    res.json({message:`document ${doc.id} created successfully`})
  })
  .catch((err)=>{
    res.status(500).json({error:'something went wrong'})
    console.log(err);
  })
}
    

exports.deleteComment=(req,res)=>{
  const document=db.doc(`/comments/${req.params.commentId}`);
  document.get()
  .then(doc=>{
    if(!doc.exists){
      return res.status(404).json({error:'Comment not found'})
    }
    if(doc.data().username!==req.user.username) {
     
      if(req.user.username==='admin'){
        return document.delete()
      }else return res.status(403).json({error:'Unauthorized'})
    }
    else {
      return document.delete()
    }
  })
  .then(()=>{
    res.json({message:'Comment deleted successfully'})
  })
  .catch(err=>{
    console.error(err)
    return res.status(500).json({error:err.code})
  })
}
