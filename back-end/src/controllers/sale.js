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
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async postSale(req, res) {
    const dataSale = req.body;
    const userId = req.user;

    try {
      const { status, message, id } = await service.create(dataSale, userId);
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

  async updateSale(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const { resultSaleById } = await service.findById(id);
      if (!resultSaleById) {
        return res.status(404).json({ message: 'Sale not found' });
      }
      const { statusCode, message } = await service.updateSale(status, id);

      return res.status(statusCode).json({ message });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
