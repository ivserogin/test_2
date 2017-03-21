const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://peter:qwerty1234@ds161109.mlab.com:61109/tasks_base',['tasks']);

//get all tasks
router.get('/tasks',function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

//get single tasks
router.get('/task/:id',function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});
//Save task
router.post('/tasks', function (req, res, next){
  var task = req.body;
  if(!task.title ||(task.isDone + '')){
    res.status(400);
    res.json({
      "error" : "Bad Data"
    });
  } else {
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

//Delete task
router.delete('/task/:id',function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

//Update task
router.put('/task/:id',function(req, res, next){
var task = req.body;
var updTask = {};
if(task.isDone){
  updTask.isDone = task.isDone;
}
if(task.title){
  updTask.title = task.title;
}
if(!updTask){
  res.status(400);
  res.json({
    "error":"Bad Date"
  });
}else {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},updTask,{},function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
}
});

module.exports = router;
