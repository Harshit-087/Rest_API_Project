import express from "express"
import {CreateTask, DeleteTask,fetchMyTasks, fetchAllTasks, UpdateTask} from "../controller/task.controllers.js"
import AuthMiddleware from "../middleware/auth.middleware.js"

const taskRouter  = express.Router()
/**
 * @swagger
 * /my-tasks/{userId}:
 *   get:
 *     summary: Get my tasks
 *     responses:
 *       200:
 *         description: Task list fetched successfully
 */
taskRouter.get("/my-tasks/:userId", AuthMiddleware, fetchMyTasks);

/**
 * @swagger
 * /all-tasks:
 *   get:
 *     summary: Get all tasks for admin
 *     responses:
 *       200:
 *         description: All tasks fetched successfully
 */
taskRouter.get("/all-tasks", AuthMiddleware, fetchAllTasks);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     responses:
 *       200:
 *         description: Task created successfully
 */
taskRouter.post("/task", AuthMiddleware, CreateTask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task by task id
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
taskRouter.put("/task/:id", AuthMiddleware, UpdateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task by task id
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
taskRouter.delete("/task/:id", AuthMiddleware, DeleteTask);
export default taskRouter;