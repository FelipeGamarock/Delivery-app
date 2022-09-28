const service = require('../services/login');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { status, message, resultUser } = await service.login({ email, password });

      if (message) {
        return res.status(status).json({ message });
      }

      return res.status(status).json(resultUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const { status, message, resultUser } = await service.register({ name, email, password });

      if (message) {
        return res.status(status).json({ message });
      }

      return res.status(status).json(resultUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
