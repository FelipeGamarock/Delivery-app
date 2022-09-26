const { User } = require('../database/models');

module.exports = {
  async findAll() {
    const allUsers = await User.findAll();

    if (!allUsers) return { status: 404, message: 'User not found' };

    return { status: 200, allUsers };
  },
};
