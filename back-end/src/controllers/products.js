const service = require('../services/products');

module.exports = {
    async products(req, res) {
        try {
          const { status, message, resultProduct } = await service.products();
          if (message) {
            return res.status(status).json({ message });
          }
    
          return res.status(status).json(resultProduct);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server error' });
        }
    },
};