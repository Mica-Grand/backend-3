import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.uid;
  try {
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.uid;
  const updateBody = req.body;
  try {
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    await usersService.update(userId, updateBody);
    res.status(200).json({ status: "success", message: "User updated" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  try {
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    await usersService.deleteUserById(userId);
    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
