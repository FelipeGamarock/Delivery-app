// Feat: fazer verificação dos campos com o joi
const service = require('../services/sale');

module.exports = {
  async findAll(_req, res) {
      try {
        const { status, message, resultSale } = await service.findAll();
        if (message) {
          return res.status(status).json({ message });
        }
        return res.status(status).json(resultSale);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
  },

  async postSale(req, res) {
    const dataBody = req.body;
    try {
      const { status, message } = await service.create(dataBody);
      if (message) {
        return res.status(status).json({ message });
      }
      return res.status(status).json({ message: 'Criou' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  },

};