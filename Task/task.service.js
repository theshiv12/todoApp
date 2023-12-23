const TaskModel = require("./task.model")
const Queue = require('bull');

let taskUpdateQueue = new Queue('taskUpdateQueue', {
    redis: {
        host: process.env.REDISURI,
        port: process.env.REDISPORT,
    },
});

exports.createTask = async (taskParams) => {
    try {
        const isTaskExist = await TaskModel.findOne({ title: taskParams.title });
        if (isTaskExist) throw new Error(`Task with Title ${taskParams.title} already exist `);
        const taskData = await TaskModel.create(taskParams);
        return taskData;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getByIdTask = async (taskParams) => {
    try {
        const isTaskExist = await TaskModel.findOne({ _id: taskParams.taskId });
        if (!isTaskExist) throw new Error(`Task Not Found`);
        return isTaskExist;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findAllTask = async () => {
    try {
        const tasks = await TaskModel.find();
        if (!tasks.length < 0) throw new Error(`Task Not Found`);
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateTask = async (taskId, taskParams) => {
    try {
        let x = await taskUpdateQueue.add('taskUpdateQueue', { taskId, taskParams });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
};

taskUpdateQueue.process('taskUpdateQueue', async (job) => {
    const { taskId, taskParams } = job.data;
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, taskParams, { new: true });
    console.log('Task updated:', updatedTask);
});

taskUpdateQueue.on('completed', (job) => {
    console.log(`Task successfully updated: ${job.data}`);
});

exports._deleteTask = async (taskParams) => {
    try {
        const isTaskExist = await TaskModel.findByIdAndDelete({ _id: taskParams.taskId });
        if (!isTaskExist) throw new Error(`Task Not Found`);
        return isTaskExist;
    } catch (error) {
        throw new Error(error.message);
    }
};
