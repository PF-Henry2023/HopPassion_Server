const mp = require("../utils/mercadoPago");
const { Order, OrderDetail } = require("../db");

const processPayment = async (userId, info) => {
    try {
        const cart = await getCurrentCart(userId)
        const total = getTotalFromCart(cart)

        if (total != info.transaction_amount) {
            throw new Error("Invalid amount");
        }

        const preference = {
            description: "Pago en HopPassion",
            payment_method_id: info.payment_method_id,
            token: info.token,
            installments: info.installments,
            payer: {
              email: info.payer.email,
            },
            transaction_amount: total
        };

        const { response } = await mp.payment.save(preference)

        if (response.status == "approved" && response.status_detail == "accredited") {
            cart.status = "send"
            cart.total = 10
            cart.save()
        }

        return { status: response.status, payment_id: response.id };
    } catch(error) {
        console.error("Error al procesar el pago:", error);
        throw new Error(error.message);
    }
}

async function getCurrentCart(userId) {
    return await Order.findOne({
        attributes: ["id", "total", "status"],
        where: {
          user_id: userId,
          status: "pending",
        },
        include: [
          {
            model: OrderDetail,
            as: "OrderDetails",
            attributes: ["quantity", "unitPrice"]
          },
        ],
    });
}

function getTotalFromCart(cart) {
    return cart.OrderDetails.reduce((accumulator, row) => {
        return accumulator + row.unitPrice * row.quantity;
    }, 0)
}

module.exports = {
    processPayment
}

/*
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
        await sendPaymentNotification(
          emailDestinatario,
          description,
          transaction_amount
        );
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
*/

/*
installments
: 
1
issuer_id
: 
"1"
payer
: 
email
: 
"cintia_08@hotmail.com"
identification
: 
{type: 'DNI', number: '12345678'}
[[Prototype]]
: 
Object
payment_method_id
: 
"visa"
token
: 
"798c96fd49961dae0ad70f7219c7d938"
transaction_amount
: 
10.48
*/