<template>
  <footer class="vue-footer">
    <div class="footer-inner">
      <p>Footer — Built with Vue 3 + Vite</p>
      <p>Exposed as <code>&lt;vue-footer&gt;</code> Web Component</p>
      <p class="copy">Polyglot MFE Demo © {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.vue-footer {
  background: linear-gradient(135deg, #0d2137 0%, #1a3a52 100%);
  color: #b8d4e8;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}

.footer-inner {
  max-width: 800px;
  margin: 0 auto;
}

.vue-footer p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.vue-footer code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

.copy {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
