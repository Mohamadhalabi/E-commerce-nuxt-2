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
            Return Policy
          </li>
        </ol>
      </nav>
      <div class="about_section mt-3">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1>Return & Refund Policy</h1>
                <p style="color:red">
                  Note: Please be aware that the original products are not returnable or refundable. Only products that meet the eligibility criteria and are returned within 15 days of purchase will be considered for a refund or exchange. Thank you for your understanding.
                </p>
                <span class="policy">Eligibility for Refunds and Exchanges</span><br>
                <ul class="privacy-policy-list">
                  <li>Your item must be unused and in the same condition that you received it.</li>
                  <li>The item must be in the original packaging.</li>
                  <li>To complete your return, we require a receipt or proof of purchase.</li>
                  <li>If you receive a refund, return shipping will be deducted from your refund.</li>
                </ul>
                <span class="policy">Partial Refunds Are Granted (If Applicable)</span><br>
                <ul class="privacy-policy-list">
                  <li>Any item not in its original condition is damaged or missing parts for reasons not due to our error.</li>
                  <li>Any item that is returned more than 15 days after delivery.</li>
                  <li>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item.</li>
                  <li>We will also notify you of the approval or rejection of your refund.</li>
                  <li>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, and will be processed within 10 to 45 days depending on the issuing bank of the credit card.</li>
                </ul>
                <span class="policy">Late Or Missing Refunds</span>
                <p>
                  If you have not received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.
                </p>
                <p>
                  If you have done all of this and you still have not received your refund yet, please contact us at (+971) 50 442 9045 or at support@tlkeys.com
                </p>
                <span class="policy">Non-Exchangeable Items</span><br>
                <ul class="privacy-policy-list">
                  <li>Items that are damaged or abused</li>
                  <li>If the customer ordered the wrong item.</li>
                  <li>Items can be exchanged for an identical item (in the case of a factory-defective item) but cannot be returned for a refund.</li>
                </ul>
                <span class="policy">
                           Shipping
                       </span>
                <p>
                  Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
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
  name: "return-policy"
}
</script>

<style scoped>
.about_content p {
  color: #5c5c5c;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  margin: 15px 0 25px 0;
}

.policy{
  font-size:20px!important;
  color:#3E444A!important;
  text-transform: capitalize;
  font-family: sans-serif;
  font-style: normal!important;
  font-weight:600;
}

.privacy-policy-list{
  font-size:16px;
  margin: 15px 0 25px 23px;
  list-style-type: circle
}
.privacy-policy-list li{
  padding:3px;
}

.about_content a{
  color:#da8b50!important;
  transition: 0.3s;
}
.about_content a:hover{
  color:#c05817!important;
}
.return-refund-policy{
  font-size: 36px;
}
</style>