const taskService = require("./task.service");
const message = require('../shared/messagePool');
const RedisCli = require("../shared/redisClient")
const redisCli = new RedisCli();

exports.create = async (req, res, next) => {
  try {
    req.body.user = req.token.id;
    const Task = await taskService.createTask(req.body);
    if (Task instanceof Error) {
      throw new Error(Task?.message);
    }
    redisCli.delete('tasks')
    return res.json({ code: message.get("SUCCESS_STATUS_CODE"), message: message.get("taskAdded") });
  } catch (error) {
    next(error)
  }
};

exports.findAll = async (req, res, next) => {
  try {
    var result = await redisCli.get('tasks');
    let parsedData = JSON.parse(result);
    if (parsedData) {
      return res.json({ code: message.get("SUCCESS_STATUS_CODE"), data: parsedData });
    } else {
      const fetchedTasks = await taskService.findAllTask();
      redisCli.add('tasks', JSON.stringify(fetchedTasks));
      return res.json({ code: message.get("SUCCESS_STATUS_CODE"), message: "shiovama mesage", data: fetchedTasks });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const Task = await taskService.getByIdTask(req.params);
    if (Task instanceof Error) {
      throw new Error(Task?.message);
    }
    return res.json({ code: message.get("SUCCESS_STATUS_CODE"), data: Task });
  } catch (error) {
    next(error)
  }
};

exports._update = async (req, res, next) => {
  try {
   await taskService.updateTask(req.params.taskId,req.body);
    redisCli.delete('tasks')
    return res.json({ code: message.get("SUCCESS_STATUS_CODE"), message:"Task Successfully updated" });
  } catch (error) {
    next(error)
  }
};

exports._delete = async (req, res, next) => {
  try {
    const Task = await taskService._deleteTask(req.params);
    if (Task instanceof Error) {
      throw new Error(Task?.message);
    }
    redisCli.delete('tasks')
    return res.json({ code: message.get("SUCCESS_STATUS_CODE") });
  } catch (error) {
    next(error)
  }
};
