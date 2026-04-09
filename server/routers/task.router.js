import express from "express";
import {
  CreateTask,
  DeleteTask,
  fetchMyTasks,
  fetchAllTasks,
  UpdateTask
} from "../controller/task.controllers.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

/**
 * @swagger
 * /my-tasks/{userId}:
 *   get:
 *     summary: Get tasks of logged-in user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7b23c9f12a4567890abcd
 *     responses:
 *       200:
 *         description: Task list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 */
taskRouter.get("/my-tasks/:userId", AuthMiddleware, fetchMyTasks);

/**
 * @swagger
 * /task-api/v1/all-tasks:
 *   get:
 *     summary: Get all tasks for admin
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
taskRouter.get("/all-tasks", AuthMiddleware, fetchAllTasks);

/**
 * @swagger
 * /task-api/v1/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete backend project
 *               description:
 *                 type: string
 *                 example: Finish task API before Friday
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Task created successfully
 */
taskRouter.post("/task", AuthMiddleware, CreateTask);

/**
 * @swagger
 * /task-api/v1/task/{id}:
 *   put:
 *     summary: Update task by task id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7b23c9f12a4567890abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
taskRouter.put("/task/:id", AuthMiddleware, UpdateTask);

/**
 * @swagger
 * /task-api/v1/task/{id}:
 *   delete:
 *     summary: Delete task by task id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64a7b23c9f12a4567890abcd
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
taskRouter.delete("/task/:id", AuthMiddleware, DeleteTask);

export default taskRouter;