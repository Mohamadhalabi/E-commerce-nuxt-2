<template>
  <div class="container">
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 mt-2" v-for="(item, index) in imageItems" :key="index">
        <a :href="item.link">
          <img
            :src="item.src"
            :alt="item.alt"
            class="img-fluid rounded home-page-image-hover"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageItems: [
        {
          src: "/images/homepage-offers/key-cutting-machines.webp",
          alt: "Key Cutting Machines",
          link: "/products/key-cutting-machines",
        },
        {
          src: "/images/homepage-offers/key-programming-devices.webp",
          alt: "Key Programming Devices",
          link: "/products/key-programming-devices",
        },
        {
          src: "/images/homepage-offers/testing-tools.webp",
          alt: "Testing Tools",
          link: "/products/testing-tools",
        },
        {
          src: "/images/homepage-offers/Emulators.webp",
          alt: "Emulators",
          link: "/products/emulators",
        },
        {
          src: "/images/homepage-offers/car-remotes.webp",
          alt: "Car Remotes",
          link: "/products/car-remotes",
        },
        {
          src: "/images/homepage-offers/keydiy-remotes.webp",
          alt: "KEYDIY Remotes",
          link: "/products/keydiy-remotes",
        },
        {
          src: "/images/homepage-offers/xhorse-remotes.webp",
          alt: "Xhorse Remotes",
          link: "/products/xhorse-remotes",
        },
        {
          src: "/images/homepage-offers/Lonsdor-remotes.webp",
          alt: "Lonsdor Remotes",
          link: "/products/lonsdor-remotes",
        },
        {
          src: "/images/homepage-offers/soldering-tools.webp",
          alt: "Soldering Tools",
          link: "/products/soldering-tools",
        },
        {
          src: "/images/homepage-offers/opening-tools.webp",
          alt: "Opening Tools",
          link: "/products/opening-tools",
        },
        {
          src: "/images/homepage-offers/immobilizer-smart-box.webp",
          alt: "Immobilizer Smart Box",
          link: "/products/immobilizer-smart-box",
        },
        {
          src: "/images/homepage-offers/ignition-lock-cylinder.webp",
          alt: "Ignition Lock Cylinder",
          link: "/products/ignition-lock-cylinder",
        },
      ],
    };
  },
};
</script>

<style>
.home-page-image-hover {
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.home-page-image-hover:hover {
  transform: scale(1.07);
}
</style>