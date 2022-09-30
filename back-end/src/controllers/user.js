const service = require('../services/user');

module.exports = {
  async findAll(_req, res) {
      try {
        const { status, message, allUsers } = await service.findAll();

        if (message) {
          return res.status(status).json({ message });
        }
        return res.status(status).json(allUsers);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
  },
  async delete(req, res) {
    const { id } = req.params;
    
    const isAdmin = req.user;
    
      try {
        const { status, message } = await service.delete(id, isAdmin);

        if (message) {
          return res.status(status).json({ message });
        }
        return res.status(status).end();
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
  },
  async create(req, res) {
    const isAdmin = req.user;
    const { name, email, password, role } = req.body;
    
      try {
        const { status, message, resultUser } = await service
          .create({ name, email, password, role }, isAdmin);

        if (message) {
          return res.status(status).json({ message });
        }
        return res.status(status).json(resultUser);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
  },

};
