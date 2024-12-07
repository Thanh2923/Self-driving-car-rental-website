const Payment = require('../models/payment'); // Đường dẫn tới file model Payment

const createPayment = async (data) => {
    const payment = new Payment(data);
    return await payment.save();
};

const getAllPayments = async () => {
    return await Payment.find();
};

const getPaymentById = async (id) => {
    return await Payment.findById(id);
};

const updatePayment = async (id, data) => {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
};

const deletePayment = async (id) => {
    return await Payment.findByIdAndDelete(id);
};
const booking = async (bookingId) => {
    return await Payment.findById(bookingId)
};
const createTransaction = async (bookingId, totalAmount) =>{
    try {
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create"
          };

          const embed_data = {bookingId};
      
          const items = [{}];

          const transID = Math.floor(Math.random() * 1000000);

          const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: totalAmount,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp"
          };
      
          // appid|app_trans_id|appuser|amount|apptime|embeddata|item
          const data =
            config.app_id +
            "|" +
            order.app_trans_id +
            "|" +
            order.app_user +
            "|" +
            order.amount +
            "|" +
            order.app_time +
            "|" +
            order.embed_data +
            "|" +
            order.item;

          order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
          
          axios
            .post(config.endpoint , null, { params: order })
            .then((res) => {
              return res.data;
            })
            .catch((err) => console.log(err));
    }catch (err) {
        return err
    }
}
module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,booking,createTransaction
};
