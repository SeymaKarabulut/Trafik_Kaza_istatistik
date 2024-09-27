const User = require("../models/userModel");
const BaseRepository = require("./baseRepository");
const bcrypt = require("bcrypt");
const { sendMessageToUsers } = require("./sendMessage");

class UserRepository extends BaseRepository {
  async getByUserName(userName) {
    const user = await User.findOne({ userName: userName });
    return user;
  }
  async create(user) {
    const newUser = new User(user);
    await newUser.save();
  }
  
  async getByIds(userIds) {
    const users = await User.find({ _id: { $in: userIds } });
    return users;
  }


  async getByUserCredentials(email, password) {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }
  async sendMessageToAdmins(selectedAdminIds, messageContent) {
  
      const selectedAdmins = await User.find({ _id: { $in: selectedAdminIds } });

      // Seçilen yöneticilere mesaj gönderimi
      await sendMessageToUsers(selectedAdmins, messageContent);

      console.log("Toplu mesaj gönderildi:", messageContent);
 
  }
}

module.exports = new UserRepository(User);
