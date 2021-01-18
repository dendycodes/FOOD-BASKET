const{db}=require('../util/admin')

exports.getAllOrders=(req,res)=>{
    db.collection('orders')
    .get()
    .then((data)=>{
      let order=[];
      data.forEach((doc)=>{
        order.push(doc.data());
      });
      return res.json(order);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).json({
        error:err.code
      });
    })
  }

  exports.postOrder=(req,res)=>{
    if(req.body.orderName.trim()===''){
      return res.status(400).json({orderName:'Order must not be empty.'})
    }
    if(req.body.hour>23 || req.body.hours<0){
      return res.status(400).json({hour:'Must be a valid hour.'})
    }

    if(req.body.minutes>59 || req.body.minutes<0){
      return res.status(400).json({minutes:'Must be valid minutes'})
    }
  const newOrder={
    orderName:req.body.orderName,
    hour:req.body.hour,
    minutes:req.body.minutes,
    username:req.user.username,
    createdAt:new Date()
  }
  
  db.collection('orders').add(newOrder).then((doc)=>{
    res.json({message:`document ${doc.id} created successfully`})
  })
  .catch((err)=>{
    res.status(500).json({error:'something went wrong'})
    console.log(err);
  })
    }



    exports.getOrder=(req,res)=>{
      let orderData={};
      db.doc(`/orders/${req.params.orderId}`)
      .get()
      .then((doc) => {
        if(!doc.exists){
          return res.status(404).json({error:'Order not found'})
        }
        
        orderData=doc.data();
        orderData.orderId=doc.id;
        return db.collection('comments').orderBy('createdAt','desc').where('orderId','==',req.params.orderId)
        .get();
      })
        .then(data=>{
          orderData.comments=[];
          data.forEach(doc=>{
            orderData.comments.push(doc.data());
          })
          return res.json({orderData} )
        })
        .catch(err=>{
          console.error(err);
          res.status(500).json({errоr:err.code})
        })
      
    }

    exports.commentOnOrder=(req,res)=>{
if(req.body.comment.trim()===''){
  return res.status(400).json({error:'Must not be empty'})
}
const newComment={
  comment:req.body.comment,
  price:req.body.price,
  createdAt:new Date(),
  orderId:req.params.orderId,
  username:req.user.username,
  userImage:req.user.imageUrl
};
db.doc(`/orders/${req.params.orderId}`)
.get()
.then(doc=>{
  if(!doc.exists){
    return res.status(404).json({error:'Order not found'})
  }
let currentDate=newComment.createdAt;

let requestedHour=parseInt(doc.data().hour);
let requestedMinutes=parseInt(doc.data().minutes);

if(currentDate.getHours()>requestedHour){
  return res.json({error:'The order is expired!'})
}
else{
  if(currentDate.getHours()===requestedHour && currentDate.getMinutes()>requestedMinutes){
    return res.json({error:'The order is expired!'})
  }else{
    return res.status(201).json(newComment);
  }
}
  //write your if here :if coment time > order time dont post coment
  //need date as well 
  //make role admiin who can delete users + delete everything in the db
  
})
.then(()=>{
  res.json(newComment)
})
.catch(err=>{
  console.error(err)
  res.status(500).json({error:'Something went wrong'})
})
    }


    exports.deleteOrder=(req,res)=>{
      const document=db.doc(`/orders/${req.params.orderId}`);
      document.get()
      .then(doc=>{
        if(!doc.exists){
          return res.status(404).json({error:'Order not found'})
        }
        if(doc.data().username!==req.user.username){
          if(req.user.username==='admin'){
            return document.delete()
          }else return res.status(403).json({error:'Unauthorized'})
        }
        else{
          return document.delete()
        }
      })
      .then(()=>{
        res.json({message:'Order deleted successfully'})
      })
      .catch(err=>{
        console.error(err)
        return res.status(500).json({error:err.code})
      })
    }