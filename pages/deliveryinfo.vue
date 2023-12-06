<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            {{ $t('deliveryinfo.DeliveryInfo') }}
          </li>
        </ol>
      </nav>
      <div class="about_section mt-lg-2">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <h1 class="delivery-info-h1"> {{ $t('deliveryinfo.DeliveryInfo') }}</h1>
              <div class="about_content">
                <h2 class="delivery-info-h2 mb-1">{{ $t('deliveryinfo.addToCart') }}</h2>
                <p>
                  The first step of your order is to add the items you want to buy to the cart by clicking the ADD TO CART button or the cart icon.
                </p>
                <h2>
                  Processing
                </h2>
                <p>
                  It normally takes 1-5 business days for us to process your order. Please note that this does not include holidays and weekends. We will contact you via e-mail or phone if a problem occurs.
                </p>
                <h2>
                  Shipping
                </h2>
                <ul class="custom-list">
                  <li class="custom-list-item">
                    Shipment normally takes 2-5 business days to arrive.
                  </li>
                  <li class="custom-list-item">
                    Shipping via e-mail option is available for software, you will receive your ordered software in the provided e-mail.
                  </li>
                  <li class="custom-list-item">
                    Please make sure you have access to the e-mail before you order. Feel free to contact us if you have any questions about the delivery process for your location.
                  </li>
                  <li class="custom-list-item">
                    Please note that if you choose to pay via Bank transfer it would take an extra 2 to 3 days for the transaction to take place.
                  </li>
                </ul>
                <h3>
                  Shipping Process and Conditions :
                </h3>
                <div>
                  <h4>
                    Order Confirmation:
                  </h4>
                  <p class="shipping-process">
                    Upon receiving an order from a customer, the store verifies the accuracy of the details and products requested before shipping.
                  </p>
                  <h4>
                    Packaging:
                  </h4>
                  <p class="shipping-process">
                    Products are carefully packed to ensure they arrive in good condition, free from damage during the shipping process.
                  </p>
                  <h4>
                    Choosing a Shipping Service:
                  </h4>
                  <p class="shipping-process">
                    A reliable and reputable shipping company is selected to ensure fast and secure delivery to customers.
                  </p>
                  <h4>
                    Shipment Tracking:
                  </h4>
                  <p class="shipping-process">
                    Customers are provided with a tracking number to monitor the shipment's status and expected arrival of the requested products.
                  </p>
                  <h4>
                    Receipt Confirmation:
                  </h4>
                  <p class="shipping-process">
                    Upon receiving the shipment, the customer must verify the products and confirm receipt by signing the proof of delivery.
                  </p>
                  <h4>
                    Addressing Issues:
                  </h4>
                  <p class="shipping-process">
                    In case of any problems or delays in delivery, the store promptly interacts with the customer to resolve the issue and ensure customer satisfaction.
                  </p>

                </div>

                <h2>
                  Delivery
                </h2>
                <p>
                  You will receive your product at the address you provided during the checkout procedure. Enjoy your new product and thank you for shopping with us!.
                </p>
                <p>
                  We are committed to ensuring the safe and timely delivery of your orders. When your order is successfully delivered, we kindly request our registered customers to retain the proof of delivery receipt. This receipt serves as confirmation that your order has been received and accepted. Keeping the signed or confirmed delivery receipt is important for your records and can be helpful in case of any future inquiries or concerns regarding your order.
                </p>
                <h3>
                  1. Delivery Fees:
                </h3>
                <p>
                  The online store may charge delivery fees based on the customer's geographic location, order size, or the logistics service used. Delivery fees are usually calculated based on the weight of the package and the distance between the store location and the customer's address.
                </p>
                <h3>
                  2. Free Delivery:
                </h3>
                <p>
                  The store might offer free delivery services to customers if their order exceeds a certain value or as part of special offers or marketing campaigns. Typically, customers need to meet a specified total order amount to qualify for free delivery.
                </p>
                <p>
                  To find out whether the store imposes delivery fees or offers free delivery, customers are advised to check the Shipping and Delivery Policy page on the store's website or contact customer service for precise information regarding the terms and conditions related to delivery services.
                </p>
                <h3>
                  Delivery Time for Local/International Orders:
                </h3>
                <h4>
                  1. Local Delivery Time:
                </h4>
                <p class="shipping-process">
                  Local delivery time is generally faster than international delivery and can take anywhere from two days to several days, depending on the location and the logistics service used.
                </p>
                <h4>
                  2. International Delivery Time:
                </h4>
                <p class="shipping-process">
                  International delivery time can be longer due to long distances, customs processes, and final delivery to the international destination. It can range from several days to several weeks, varying based on the country and the speed of the chosen logistics service.
                  To find out the specific local and international delivery times for the products you wish to purchase, customers are advised to check the Shipping and Delivery Policy page on the store's website. The store typically provides detailed information about the expected delivery times for each service.

                </p>

                <p class="">
                  Please note that upon successful completion of the payment process, the payment confirmation will be sent to you via the email provided during the purchase. The confirmation message will include details of your order and a summary of the payment. Payment confirmations are typically delivered within a few minutes after the online payment is completed.
                </p>
                <p class="">
                  If you do not receive the payment confirmation within a reasonable time, please check your spam or junk mail folder. If you still encounter any issues or have questions, feel free to contact our customer service team. We are here to assist you.
                </p>
                <p class="">
                  <a href="/">tlkeys.com</a> will NOT deal or provide any services or products to any of OFAC (Office of Foreign Assets Control) sanctions countries in accordance with the law of (United Arab Emirates).
                </p>
                <p>
                  If you have any questions or require assistance regarding the delivery of your order, please do not hesitate to contact our customer support team. Thank you for choosing us for your shopping needs. Your satisfaction is our priority.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "deliveryinfo"
}
</script>

<style scoped>
.about_content p , .about_content ul{
  color: #757575;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
}
.about_content ul{
  list-style-type: circle;
  padding: 15px;
}
.note{
  color: red;
}
.delivery-info-h1{
  font-size: 36px;
  font-weight: 500;
}
.delivery-info-h2{
  font-weight: normal;
  font-size: 26px;
}
</style>