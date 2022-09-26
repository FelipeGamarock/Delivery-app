// Feat: fazer verificação dos campos com o joi
const service = require('../services/sale');

module.exports = {
  async findAll(_req, res) {
      try {
        const { status, message, resultSaleData } = await service.findAll();

        if (message) {
          return res.status(status).json({ message });
        }
        return res.status(status).json(resultSaleData);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
  },

  async postSale(req, res) {
    const dataBody = req.body;
    try {
      const { status, message, id } = await service.create(dataBody);
      if (message) {
        return res.status(status).json({ message });
      }
      return res.status(status).json({ id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async findById(req, res) {
    const { id } = req.params;
    try {
      const { status, message, resultSaleById } = await service.findById(id);
      if (!resultSaleById) {
        return res.status(status).json({ message });
      }
      return res.status(status).json(resultSaleById);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

};
