import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await Task.find({ boardId }).select("title status subTasks");
    res.status(200).json(
      tasks.map((t) => {
        const temp = t.toObject();
        delete temp.subTasks;
        return temp;
      })
    );
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const tasks = await Task.findOne({ _id: taskId });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const createTask = async (req, res) => {
  const body = req.body;
  try {
    const task = await Task.create(body);
    res.status(200).json(task._id);
  } catch (e) {
    res.status(200).json(e);
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, body);
    res.status(200).json(task._id);
  } catch (e) {
    res.status(200).json(e);
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    res.status(200).json(task._id);
  } catch (e) {
    res.status(200).json(e);
  }
};
