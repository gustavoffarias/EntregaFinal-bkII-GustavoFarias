import usersManager from "../data/memory/users.manager.js";

const socketCb = async (socket) => {
  console.log("socket connected id: " + socket.id);

  socket.on("new user", async date => {
    const id = await usersManager.createUser(date)
//    const allUsers = await usersManager.readAllUsers()
//    socket.emit("update users", allUsers)
  })
//  const allUsers = await usersManager.readAllUsers()
//  socket.emit("update users", allUsers)
};

export default socketCb;
