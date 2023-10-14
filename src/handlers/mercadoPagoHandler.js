const { processPayment } = require("../controllers/mercadopagoController");
const payment = require("../utils/mercadoPago");
const nodemailer = require("nodemailer"); // Import Nodemailer
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const sendPaymentNotification = async (
  emailDestinatario,
  transaction_amount
) => {
  const mailOptions = {
    from: emailUser,
    to: emailDestinatario,
    subject: "Confirmacion de pago",
    text: `Gracias por confiar en nosotros. El monto total de tu compra fue de: ${transaction_amount} pesos`,
  };

const processPaymentHandler = async (req, res) => {
  const userId = req.userId;
  try {
    const response = await processPayment(userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const mercadoPagoPayment = async (req, res) => {
  try {
    const {
      description,
      transaction_amount,
      email,
      payment_method_id,
      token,
      installments,
    } = req.body;
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
    const emailDestinatario = payment_data.payer.email;
    // Process the payment and send the email inside the .then block
    payment.payment
      .save(payment_data)
      .then(async function (response) {
        console.log("Respuesta de MercadoPago:", response.body);
        console.log("Respuesta de MercadoPago:", req.body);
        res.json({ status: response.status, payment_id: response.body.id });

        // Send the payment notification email after a successful payment
        await sendPaymentNotification(emailDestinatario, transaction_amount);
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
  processPaymentHandler,
};
