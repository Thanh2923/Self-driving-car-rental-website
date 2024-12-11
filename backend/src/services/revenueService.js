const payment = require('../models/payment')
const RevenueService = {
    totalRevenue : async ()=> {
        const result = await payment.aggregate([
            { $match: { payment_status: "Completed" } }, // Chỉ lấy các payment có trạng thái "Completed"
            { $group: { _id: null, totalAmount: { $sum: "$payment_amount" } } } // Tính tổng payment_amount
          ]);
          
          // Nếu không có kết quả, trả về 0
          console.log(result)
          return result.length > 0 ? result[0].totalAmount : 0;
    }
}
module.exports = RevenueService;