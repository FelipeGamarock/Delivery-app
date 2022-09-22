const service = require('../services/sale')

module.exports = {
  async findAll(req, res) {
      try {
        const { status, message, resultSale } = await service.findAll();
        if (message) {
          return res.status(status).json({ message });
        }
       console.log(resultSale); 
        return res.status(status).json(resultSale);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
      }
  },
};