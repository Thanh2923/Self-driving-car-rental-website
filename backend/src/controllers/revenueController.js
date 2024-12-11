const RevenueService = require("../services/revenueService");
const Revenue = {
  calculatorTotalRevenue: async (req, res) => {
    try {
      const getPaymentAmount = await RevenueService.totalRevenue();
      if (!getPaymentAmount) {
        return res.status(404).json({ message: "Current revenue not found !" });
      }
      return res.status(200).json({
        message: "Total revenue calculated successfully!",
        totalRevenue: getPaymentAmount // Tổng doanh thu
      });
    } catch (err) {
      console.error("Error calculating total revenue:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
module.exports = Revenue;
