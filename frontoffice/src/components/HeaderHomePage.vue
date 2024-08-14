<template>
  <router-link
    to="/explore"
    class="flex justify-center items-center h-96 w-full text-wrap text-white font bg-slate-400 text-3xl pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-slate-200 hover:text-slate-400 duration-300"
    >Your Online Portfolio</router-link
  >
  <div class="flex justify-center items-start h-auto w-full font bg-slate-500 flex-col p-8">
    <h1 class="text-3xl mb-6 text-white">About Us</h1>
    <h4 class="text-xl mb-6 text-slate-100">
      Welcome to Online Portfolio, where creativity meets opportunity!
    </h4>
    <p class="text-slate-200 text-justify indent-8">
      At Online Portfolio, we are passionate about providing a platform where artists, designers,
      and creative professionals can showcase their work to the world. Our mission is to empower
      talented individuals by offering a user-friendly, elegant, and dynamic space to display their
      portfolios, connect with potential clients, and advance their careers.
    </p>
  </div>
  <div class="flex justify-center items-start h-auto w-full font bg-slate-600 flex-col p-8">
    <h1 class="text-3xl mb-6 text-white">Our Vision</h1>
    <p class="text-slate-200 text-justify indent-8">
      We believe in the power of creative expression and the impact it can have on the world. Our
      vision is to create a vibrant community where creativity thrives, and every artist has the
      opportunity to shine. We strive to be the premier destination for discovering and celebrating
      exceptional talent.
    </p>
  </div>
  <div class="flex justify-center items-start h-auto w-full font bg-slate-700 flex-col p-8">
    <h1 class="text-3xl mb-6 text-white">What We Offer</h1>
    <ul class="text-slate-200 text-justify list-disc pl-8">
      <li class="mb-4">
        <strong>Elegant Portfolio Displays:</strong> Our platform offers beautifully designed
        templates that let your work speak for itself. Customize your portfolio to reflect your
        unique style and personality.
      </li>
      <li class="mb-4">
        <strong>Networking Opportunities:</strong> Connect with other creatives and potential
        clients through our built-in networking tools. Join a community that values collaboration
        and creative exchange.
      </li>
      <li class="mb-4">
        <strong>Easy-to-Use Features:</strong> Whether you’re a seasoned professional or just
        starting out, our intuitive interface makes it easy to build and manage your portfolio.
      </li>
      <li class="mb-4">
        <strong>Support and Resources:</strong> From tips on creating a standout portfolio to
        guidance on leveraging your online presence, we provide resources to help you succeed.
      </li>
    </ul>
  </div>
  <div class="flex justify-center items-start h-auto w-full font bg-slate-800 flex-col p-8">
    <h1 class="text-3xl mb-6 text-white">Join Us</h1>
    <p class="text-slate-200 text-justify indent-8">
      Are you ready to showcase your talent and connect with a global audience?
      <router-link to="/explore" class="text-blue-400 underline hover:text-blue-600">
        Post your artwork
      </router-link>
      today and take the first step toward sharing your creative journey with the world.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
