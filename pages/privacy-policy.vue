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
            Privacy Policy
          </li>
        </ol>
      </nav>
      <div class="about_section mb-5 mt-lg-2">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1 class="delivery-info-h1">Our Privacy Policy</h1>
                <p>
                  All credit/debit card details and personally identifiable information will NOT be stored, sold, shared, rented, or leased to any third parties.
                </p>
                <p>
                  The Website Policies and <a href="/terms">Terms and Conditions</a> may be changed or updated occasionally to meet the requirements and standards.<br>
                  Therefore the Customers are encouraged to frequently visit these sections in order to be updated about the changes on the website.<br>
                  Modifications will be effective on the day they are posted.
                </p>
                <p>
                  Some of the advertisements you see on the Site are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers.<br>
                  These third parties may collect information about you and your online activities, either on the Site or on other websites, through cookies, web beacons, and other technologies in an effort to understand your interests and deliver to you advertisements that are tailored to your interests.<br>
                  Please remember that we do not have access to, or control over, the information these third parties may collect.<br>
                  The information practices of these third parties are not covered by this privacy policy.<br>
                </p>

                <p>
                  We respect your privacy and are committed to protecting your personal information. If you make a payment for our products or services on our website, certain details will be required from you. Please note that we use this information solely for the purpose of completing the payment process and delivering the requested service or product.
                </p>

                <p>
                  The information collected from you during the payment process, such as your name, email address, and credit card details, is used to process the payment and ensure the correct delivery of the purchased products or services. We guarantee the confidentiality and security of this information through the use of a secure and trusted connection to our payment provider.
                </p>
                <p>
                  We do not share your personal information with any third party outside of completing the payment process and delivering the service or product. Additionally, we are committed to complying with all relevant laws and regulations related to the protection of personal data.
                </p>
                <p>
                  We prioritize the security and confidentiality of your personal information. When you engage in transactions with us, rest assured that we will not disclose any debit/credit card details to third parties under any circumstances. Your trust is of utmost importance to us, and we are dedicated to safeguarding your privacy and ensuring a secure experience throughout your interactions with our services.
                </p>
                <p>
                  At <a href="/">tlkeys.com</a>, we are dedicated to protecting your data privacy and security. We employ a range of hardware and software methods to ensure the confidentiality and integrity of your personal information. However, it's important to note that while we take all necessary precautions, we cannot guarantee the absolute security of any information disclosed online.
                </p>
                <p>
                  We encourage you to take appropriate measures on your end, such as using strong passwords and ensuring the security of your devices and internet connection. By using our services, you acknowledge that the security of information transmitted online can never be completely guaranteed.
                </p>
                <p>
                  Please be aware that <a href="/">tlkeys.com</a> may contain links to external websites. While we strive to provide links to reputable and trustworthy sources, we want to emphasize that the merchant is not responsible for the privacy policies or practices of these external websites.
                </p>
                <p>
                  When you access these third-party websites, different rules regarding the collection and use of your personal information may apply. We recommend that you review the privacy policies of these websites to understand how your data will be handled by them.
                </p>
                <p>
                  if you choose to provide any information to these third parties, it is important to note that the merchant disclaims any responsibility for their privacy practices. We encourage you to contact these entities directly if you have any questions about how they collect, use, or safeguard your personal information.
                </p>
                <p>
                  Your privacy and security are paramount to us. If you have any concerns or questions about our privacy policy or the practices of external websites linked from <a href="/">tlkeys.com</a>, please do not hesitate to <a href="/contact">contact us</a>. Thank you for trusting us with your information.
                </p>
                <p>
                  If you have any inquiries regarding how your personal information is collected or used, please do not hesitate to <a href="/contact">contact us</a> via the <a href="mailto:info@tlkeys.com">Email</a> or <a href="tel:+971504429045"> (+971) 50 442 9045</a> .
                </p>
                <p>
                  Thank you for your trust in us, and we look forward to serving you with professionalism and security.
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
  name: "privacy-policy"
}
</script>

<style scoped>
.about_content p {
  color: #757575;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
}
.delivery-info-h1{
  font-size: 36px;
  font-weight: 500;
}
.privacy-policy {
  color: #757575;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
}
</style>