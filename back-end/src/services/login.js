const md5 = require('md5');
const token = require('../utils/token');
const { User } = require('../database/models');

module.exports = {
  async login({ email, password }) {
    const hashMd5 = md5(password);

    const user = await User.findOne({ where: { email, password: hashMd5 } });

    if (!user) return { status: 404, message: 'User not found' };

    if (!hashMd5) return { status: 400, message: 'Invalid password' };

    const resultUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      token: token.generate(user.id, user.email, user.role),
    };

    return { status: 200, resultUser };
  },

  async register({ name, email, password, role = 'customer' }) {
    const hashMd5 = md5(password);
    const user = await User.findOne({ where: { email } });

    if (user) return { status: 409, message: 'User already exists' };

    const newUser = await User.create({
      name,
      email,
      password: hashMd5,
      role,
    });

    const resultUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
      token: token.generate(newUser.id, newUser.email, newUser.role),
    };

    return { status: 201, resultUser };
  },

  async findById(id) {
    const getUserById = await User.findOne({ where: { id } });
    const { name } = getUserById.dataValues;
    return name;
  },
};
