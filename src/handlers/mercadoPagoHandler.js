const payment = require("../utils/mercadoPago");

const mercadoPagoPayment = async (req, res) => {
  try {
    const { description, transaction_amount, email, payment_method_id, token, installments } =
      req.body;
    const preference = {
      items: [
        {
          title: description,
          unit_price: transaction_amount,
          quantity: 1,
        },
      ],
      payer: {
        email: email,
      },
    };
    const response = await payment.preferences.create(preference);
    console.log("respuesta de crear las preferencias", response);
    const payment_data = {
      token: token,
      transaction_amount: transaction_amount,
      payment_method_id: payment_method_id,
      installments: installments,
      payer: {
        email: req.body.payer.email,
      },
    };
    payment.payment
      .save(payment_data)
      .then(function (response) {
        console.log("Respuesta de MercadoPago:", response.body);
        res.json({ status: response.status, payment_id: response.body.id });
      })
      .catch(function (error) {
        console.error("Error al procesar el pago:", error);
        res.status(500).json({ message: "Error al procesar el pago" });
      });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ message: "Error al procesar el pago" });
  }
};

module.exports = {
  mercadoPagoPayment,
};
