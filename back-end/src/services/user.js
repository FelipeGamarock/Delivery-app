const md5 = require('md5');
const token = require('../utils/token');
const { User } = require('../database/models');

module.exports = {
  async findAll() {
    const allUsers = await User.findAll();

    if (!allUsers) return { status: 404, message: 'User not found' };

    return { status: 200, allUsers };
  },

  async delete(id, isAdmin) {
    const { role } = isAdmin;
    
    if (role !== 'administrator') return { status: 401, message: 'not authorized' };

    if (!id) return { status: 404, message: 'Id not found' };
    
    await User.destroy({
      where: { id },
    });

    return { status: 204 };
  },

  async create({ name, email, password, role }, isAdmin) {
    if (isAdmin.role !== 'administrator') return { status: 401, message: 'not authorized' };
    const hashMd5 = md5(password);
    
    const user = await User.findOne({ where: { email, name } });

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
};
