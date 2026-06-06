---
transition: slide-up
---

<script setup>
const contents = [
  { text: '<b>Problem:</b> Encrypt a single character by shifting it by 3 positions forward in ASCII (Caesar cipher). Decrypt it by shifting back by 3.' },
  { text: '<b>Input (hardcoded):</b> <code>char ch = \'H\'</code>' },
  { text: '<b>Expected Output:</b><br><code>Original  : H</code><br><code>Encrypted : K</code><br><code>Decrypted : H</code>' },
  { text: '<b>Note:</b> Encryption adds 3 to the ASCII value: <code>\'H\'</code> (72) + 3 = 75 = <code>\'K\'</code>. Decryption subtracts 3.' },
  { text: '<b>Hint:</b> Use <code>(char)(ch + 3)</code> to encrypt and <code>(char)(encrypted - 3)</code> to decrypt. The <code>(char)</code> cast converts the integer result back to a character.', highlight: true },
]
</script>

<Slide
  topic="Type Checking & Conversion"
  sub-topic="Practice Problem"
  :contents="contents"
/>
