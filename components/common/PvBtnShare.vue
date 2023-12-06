<template>
  <div class="social-icons mx-1">
    <twitter-button
      class="share-button--circle share-button "
      btn-text
      :modal-width="25"
      :url="url"
      description="GitHub is where people build software."
    />

    <facebook-button
      class="share-button--circle share-button "
      btn-text
      :url="url"
      description="GitHub is where people build software."
    />
    <whats-app-button
      class="share-button--circle share-button "
      btn-text
      :url="url"
      description="GitHub is where people build software."
    />
    <linkedin-button
      class="share-button--circle share-button "
      btn-text
      :url="url"
      description="GitHub is where people build software."
    />
  </div>
</template>

<script>
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton';
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton';
import WhatsAppButton from 'vue-share-buttons/src/components/WhatsAppButton';
import LinkedinButton from 'vue-share-buttons/src/components/LinkedInButton';


export default {
  components: {
    TwitterButton, FacebookButton, WhatsAppButton, LinkedinButton
  },
  props: {
    url: {
      type: String,
      default: null,
      require: true
    }
  }
};
</script>

<style>
.share-button--circle{
  width: 20px;
  height: 20px;
}
</style>
