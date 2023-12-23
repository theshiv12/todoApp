const TaskModel = require("./task.model")

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

exports.updateTask = async (taskId,taskParams) => {
    try {
        console.log(taskId,taskParams)
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            taskParams,
            { new: true } 
          );
        console.log(updatedTask)
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports._deleteTask = async (taskParams) => {
    try {
        const isTaskExist = await TaskModel.findByIdAndDelete({ _id: taskParams.taskId });
        if (!isTaskExist) throw new Error(`Task Not Found`);
        return isTaskExist;
    } catch (error) {
        throw new Error(error.message);
    }
};
