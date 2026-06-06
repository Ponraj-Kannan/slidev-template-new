<style>
  .card:hover{
    transform: translateY(-5px);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease-in-out;
  }
</style>

<script setup>
  import './style.css';
</script>

<Slide2 topic="Features of Python">
  <template #content>
<div class="slide-h1" style="margin-bottom:12px;">Why Python is <span class="highlight">Awesome</span></div>

<div class="g3" style="gap:10px;">

<div v-click class="card" style="border:1px solid #ef5050;">
  <div style="font-size:1.6rem;margin-bottom:6px;">📖</div>
  <div class="slide-h3" style="margin-bottom:4px;">Easy to Read</div>
  <div class="small-text">Syntax resembles plain English. No messy curly braces or semicolons!</div>
</div>

<div v-click class="card" style="border:1px solid #3182ce;">
  <div style="font-size:1.6rem;margin-bottom:6px;">⚡</div>
  <div class="slide-h3" style="margin-bottom:4px;">Interpreted</div>
  <div class="small-text">Code runs line-by-line. No compilation step needed.</div>
</div>

<div v-click class="card" style="border:1px solid #38a169;">
  <div style="font-size:1.6rem;margin-bottom:6px;">🌐</div>
  <div class="slide-h3" style="margin-bottom:4px;">Cross-Platform</div>
  <div class="small-text">Write once, run on Windows, Mac, Linux, Raspberry Pi...</div>
</div>

<div v-click class="card" style="border:1px solid #dd6b20;">
  <div style="font-size:1.6rem;margin-bottom:6px;">🔓</div>
  <div class="slide-h3" style="margin-bottom:4px;">Open Source</div>
  <div class="small-text">Free forever. Huge community of millions of developers.</div>
</div>

<div v-click class="card" style="border:1px solid #9f7aea;">
  <div style="font-size:1.6rem;margin-bottom:6px;">📦</div>
  <div class="slide-h3" style="margin-bottom:4px;">Rich Libraries</div>
  <div class="small-text">300,000+ packages on PyPI. There's a library for everything.</div>
</div>

<div v-click class="card" style="border:1px solid #d69e2e;">
  <div style="font-size:1.6rem;margin-bottom:6px;">🧩</div>
  <div class="slide-h3" style="margin-bottom:4px;">Versatile</div>
  <div class="small-text">Web, AI, data, games, automation — Python does it all.</div>
</div>

<div v-click class="card" style="border:1px solid #ef5050;">
  <div style="font-size:1.6rem;margin-bottom:6px;">📖</div>
  <div class="slide-h3" style="margin-bottom:4px;">Easy to Read</div>
  <div class="small-text">Syntax resembles plain English. No messy curly braces or semicolons!</div>
</div>

<div v-click class="card" style="border:1px solid #3182ce;">
  <div style="font-size:1.6rem;margin-bottom:6px;">⚡</div>
  <div class="slide-h3" style="margin-bottom:4px;">Interpreted</div>
  <div class="small-text">Code runs line-by-line. No compilation step needed.</div>
</div>

<div v-click class="card" style="border:1px solid #38a169;">
  <div style="font-size:1.6rem;margin-bottom:6px;">🌐</div>
  <div class="slide-h3" style="margin-bottom:4px;">Cross-Platform</div>
  <div class="small-text">Write once, run on Windows, Mac, Linux, Raspberry Pi...</div>
</div>

</div>

<div v-click style="margin-top:10px;" class="callout callout-info">
  <div>Python's guiding principle: <strong>"There should be one — and preferably only one — obvious way to do it."</strong> (The Zen of Python)</div>
</div>

  </template>
</Slide2>
