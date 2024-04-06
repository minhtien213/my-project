const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const convert_vnd_type = require('../../utils/convert_vnd_type');

const sendEmailCreated = async (data) => {
  //   console.log(data);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Tạo nội dung HTML cho email
  let tbodyContent = ''; // Khởi tạo nội dung của tbody

  // Duyệt qua danh sách sản phẩm và thêm mỗi sản phẩm vào tbody
  data.listOrder.forEach((order) => {
    const price = convert_vnd_type(order.productId.price);
    tbodyContent += `
      <tr>
        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${order.productId.name}</td>
        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${price}</td>
        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${order.quantity}</td>
      </tr>
    `;
  });

  const totalPrice = convert_vnd_type(data.totalPrice);
  const htmlContent = `
    <h3 style="color: #333; text-align: left;">Cảm ơn ${data.shippingInfo.name} đã mua hàng tại MTSHOP.COM.VN</h3>
    <h4 style="color: #555; text-align: left; text-transform: uppercase; font-weight: bold;">Mã đơn hàng: ${data._id}</h4>
    <h4 style="color: #555; text-align: center;">Danh sách sản phẩm</h4>
    <table style="border-collapse: collapse; width: 90%; margin: 0 auto;">
      <thead>
        <tr>
          <th style="border: 1px solid #000; padding: 8px;">Tên sản phẩm</th>
          <th style="border: 1px solid #000; padding: 8px;">Giá</th>
          <th style="border: 1px solid #000; padding: 8px;">Số lượng</th>
        </tr>
      </thead>
      <tbody>
        ${tbodyContent} <!-- Thêm nội dung tbody đã tạo vào đây -->
      </tbody>
    </table>
    <h4 style="color: #444; text-align: left;">Phí giao hàng: ${data.deliveryCharges}đ</h4>
    <h4 style="color: #444; text-align: left;">Phương thức thanh toán: ${data.paymentMethod}</h4>
    <h4 style="color: #444; text-align: left;">Ghi chú: ${data.note}</h4>
    <h4 style="color: #444; text-align: left;">Tổng giá tiền: ${totalPrice}</h4>
  `;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: data.shippingInfo.email, // list of receivers
    subject: 'MTSHOP.COM.VN', // Subject line
    // text: `<b>Cảm ơn ${data.shippingInfo.name} đã mua hàng của chúng tôi.</b>`, // plain text body
    html: htmlContent, // html body
  });
};

module.exports = { sendEmailCreated };
