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

};
