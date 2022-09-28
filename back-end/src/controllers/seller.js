const service = require('../services/seller');

module.exports = {
  async findAll(req, res) {
    const { id } = req.user;
    try {
      const { status, message, resultGetAllSale } = await service.findAll(id);

      if (message) {
        return res.status(status).json({ message });
      }
      return res.status(status).json(resultGetAllSale);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
