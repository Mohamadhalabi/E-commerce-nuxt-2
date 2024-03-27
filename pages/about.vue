<template>
	<main class="main about">
		<nav
			aria-label="breadcrumb"
			class="breadcrumb-nav"
		>
			<div class="container">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<nuxt-link to="/">
							{{ $t('header.home') }}
						</nuxt-link>
					</li>
					<li
						class="breadcrumb-item active"
						aria-current="page"
					>{{ $t('common.aboutUs') }}</li>
				</ol>
			</div>
		</nav>
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-10 m-auto">
          <nuxt-img format="webp" src="/images/about-us/about-us-1.jpg" class="animated-image" />
        </div>
        <div class="content-column col-xl-7 col-lg-7 col-md-12 col-sm-12  mt-lg-3 m-auto p-5">
          <div class="sec-title">
            <span class="about-us-title">About Techno Lock</span>
            <h2 class="about-us-h2 mt-1">We are a creative key trading company working since 1997</h2>
          </div>
          <p class="about-us-p mb-2">
            Because we are one of the top safe and secured businesses, our practice is highly recommended by our clients. A significant part of our
            business comes from referrals by customers who are pleased with the quality of service we offer
          </p>
          <p class="about-us-p mb-2">
            The company was established in 1997 with a mission to transform the automobiles keys trading, programmable devices and key making in the UAE market and other part of the world.
          </p>
          <p class="about-us-p mb-2">
            The brand "Techno lock Keys" has been striving to deliver top performance products to fulfil every customer's requirement.The motto of the company is to offer defect-free products with zero complaints from customers.
          </p>
          <base-button-icon-1
            class="py-3 mt-lg-5 contactUsButton"
            :outline="true">
            <nuxt-link to="/contact" class="contactUsButton">
              Contact Us
            </nuxt-link>
          </base-button-icon-1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-7 m-auto p-5">
          <span class="about-us-title">Our Future Goal</span>
          <h2 class="about-us-h2 mt-1">We want to lead in innovation & Technology</h2>
          <p class="about-us-p mb-2">
            Increase market share by expanding product line to smart key systems.
          </p>
          <p class="about-us-p mb-2">
            Improve customer satisfaction by offering 24/7 technical support.
          </p>
          <p class="about-us-p mb-2">
            Streamline production process to reduce costs and improve efficiency. Develop strong partnerships with car manufacturers to increase brand recognition.
          </p>
          <p class="about-us-p mb-2">
            Implement eco-friendly production methods to promote sustainability, Expand international reach by opening new sales and distribution centers. Invest in research and development to introduce innovative products.
          </p>
          <p class="about-us-p mb-2">
            Foster a positive company culture to attract and retain top talent.
          </p>
        </div>
        <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-10 m-auto">
          <img src="../static/images/about-us/about-us-2.jpg" class="animated-image"  />
        </div>
      </div>
    </div>
    <div class="container-fluid about-us-second-section mt-5">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-12">
            <span class="about-us-title">What we Offer</span>
            <h2 class="about-us-h2 mt-1">Our Comprehensive Locksmith Services and Solutions</h2>
          </div>
          <div class="col-lg-12">
            <div class="row">
<!--              card one-->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    Very Convenient & High Quality Services.
                  </h4>
                  <p class="about-us-services">
                    Our company offers its customers only high-precision products. We invest in production processes and strive for continuous improvement.
                  </p>
                </div>
              </div>
<!--              card two -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    Key Programming And Reprogramming Services.
                  </h4>
                  <p class="about-us-services">
                    We are specialist auto locksmiths and we offer services such as repairing key fobs, reprogramming keys and providing spare transponder keys.
                  </p>
                </div>
              </div>
<!--              card 3 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    Car Key Repair Services.
                  </h4>
                  <p class="about-us-services">
                    We have the experience and expertise to repair almost any broken or damaged key and fob. We are providing fast and reliable car key repair services.
                  </p>
                </div>
              </div>
<!--              card 4 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    Lost Key Replacement Services.
                  </h4>
                  <p class="about-us-services">
                    If you have lost your vehicle key you no longer need to wonder about how you are going to get a new one, simply contact us and get your key.
                  </p>
                </div>
              </div>
<!--              card 5 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    Software Update
                  </h4>
                  <p class="about-us-services">
                    We offer software designed specifically for locksmiths to streamline their operations and enhance their services. Our software features a range of tools and features.
                  </p>
                </div>
              </div>
<!--              card 6 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    24/7 Support
                  </h4>
                  <p class="about-us-services">
                    We offer 24/7 support to our customers, ensuring that they have access to assistance whenever they need it. Our dedicated support team is available to answer any questions.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</main>
</template>

<script>
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import { transition } from 'vue';

export default {
  head() {
    return {
      title: "Discover Our Story: Learn About Techno lock Mission, Values, and Journey",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/about',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Uncover Techno lock story: Our mission, values, and journey towards excellence. Join us in celebrating our commitment to making a difference."
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        },
        {
          name: "twitter:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          rel: "shortcut icon",
          href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        },
      ],
      script: [
        { type: 'application/ld+json', json: {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "name": "Techno Lock Keys Trading",
            "url": "https://www.tlkeys.com/",
            "image": "https://www.tlkeys.com/tlk-logo.png",
            "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
              "addressCountry": "AE"
            },
            "telephone": "+971 6 542 1313",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "8:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Paypal",
            "sameAs": [
              "https://www.facebook.com/technolockkeys_world/",
              "https://twitter.com/techno_lock",
              "https://api.whatsapp.com/send?phone=971504429045"
            ]
          }
        },
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.tlkeys.com",
            "logo": this.$settings.website.system_logo_black.l.url
          }
        }
      ]
    }
  },
	components: {
    BaseButtonIcon1
	},
	data: function() {
		return {
			toggleState: [true, false, false, false]
		};
	},
	props: {
		isMagnify: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		lightBoxMedia: function() {
			let pictures = [];
			pictures.push({
				src: './images/home/team/member-1.jpg',
				thumb: './images/home/team/member-1.jpg'
			});
			pictures.push({
				src: './images/home/team/member-2.jpg',
				thumb: './images/home/team/member-2.jpg'
			});
			pictures.push({
				src: './images/home/team/member-3.jpg',
				thumb: './images/home/team/member-3.jpg'
			});
			pictures.push({
				src: './images/home/team/member-4.jpg',
				thumb: './images/home/team/member-4.jpg'
			});

			return pictures;
		}
	},
	methods: {
		openLightBox: function(index) {
			this.$refs.lightBox.showImage(index);
		},
		changeToggle: function(index) {
			let tmp = this.toggleState[index];
			this.toggleState.fill(false);
			this.toggleState[index] = !tmp;
			this.toggleState = [...this.toggleState];
		}
	}
};
</script>
<style>
span.about-us-title{
  color: #f07905;
  font-size: 16px;
  letter-spacing: 0.2rem;
}
.about-us-h2{
  font-size: 24px;
  position: relative;
  display: block;
  line-height: 1.28em;
  color: #222222;
  font-weight: 600;
  padding-bottom: 18px;
  font-size: 24px!important;
}
.about-us-h2:before{
    position: absolute;
    content: '';
    left: 0px;
    bottom: 0px;
    width: 50px;
    height: 3px;
    background-color: #d1d2d6;
}
.about-us-p{
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.1rem;
  color: #848484;
  font-weight: 400;
}
.contactUsButton{
  color: white;
}
.about-us-h4{
  font-size: 16px;
}
.about-us-second-section{
  background-color: #f9f9f9;
}
.about-us-services{
  font-size: 14px;
  color: #848484;
}
.about-us-card{
  transition: all 0.35s ease-in-out;
}
.about-us-card:hover{
  background-color: #f07905;
  color: white!important;
  .about-us-services{
    color: white;
  }
  .about-us-h4{
    color: white;
  }
}
.contactUsButton{
  width: 25%;
}
@media screen and (max-width: 575px){
  .contactUsButton{
    width: 50%;
  }
}
@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animated-image {
  animation: slideFromLeft 2s ease forwards; /* Adjust the animation duration and timing function as needed */
}
</style>
