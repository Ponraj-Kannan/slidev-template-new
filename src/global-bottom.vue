<script setup>
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import LoginOverlay from './components/LoginOverlay.vue'
import { authState, logout } from './auth'

const { currentPage, total } = useNav()
const { $frontmatter } = useSlideContext()

const sessionLabel = computed(() => $frontmatter.value?.sessionLabel || 'Session')
const sessionTitle = computed(() => $frontmatter.value?.sessionTitle || $frontmatter.value?.title || 'Untitled Deck')

async function handleLogout() {
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      await (document.exitFullscreen?.() || document.webkitExitFullscreen?.())
    }
  } catch (e) {
    // ignore fullscreen errors
  } finally {
    logout()
  }
}
</script>

<template>
  <div>
    <!-- Authentication Overlay -->
    <LoginOverlay />

    <!-- Slides Footer - only visible when logged in -->
    <div class="fp-footer" v-if="authState.isLoggedIn" >
      <div class="fp-right-section">
        <!-- Whitelist Admin Panel Button -->
        <button 
          v-if="authState.isAdmin" 
          @click="authState.showAdminPanel = !authState.showAdminPanel" 
          class="fp-admin-btn"
          :class="{ 'fp-admin-btn--active': authState.showAdminPanel }"
          title="Whitelist Administration"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fp-icon">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <!-- User profile and logout -->
        <div class="fp-user-badge" :title="`${authState.userName} (${authState.userEmail})`">
          <img v-if="authState.userPicture" :src="authState.userPicture" class="fp-avatar" referrerpolicy="no-referrer" />
          <div v-else class="fp-avatar-placeholder">
            {{ authState.userName ? authState.userName.charAt(0).toUpperCase() : authState.userEmail.charAt(0).toUpperCase() }}
          </div>
          <button @click="handleLogout" class="fp-logout-btn" title="Sign Out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fp-logout-icon">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>

        <!-- Page numbers -->
        <div class="fp-page">
          <span class="fp-page-num">{{ currentPage }}</span>
          <span class="fp-page-sep">/</span>
          <span class="fp-page-total">{{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fp-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  border-top: 1px solid #ef5050;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  padding: 0 1.5rem;
  z-index: 100;
  font-family: 'Inter', system-ui, sans-serif;
  width: 95%;
  margin-left: 2.5%;
  /* backdrop blur  */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  background-color: #ffffff;
}

.fp-module {
  color: #475569;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Auth enhancements */
.fp-right-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fp-admin-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.fp-admin-btn:hover,
.fp-admin-btn--active {
  color: #ef5050;
  background: #ef505046;
}

.fp-icon {
  width: 16px;
  height: 16px;
}

.fp-user-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #232323e9;
  border-radius: 20px;
  padding: 3px 4px 3px 3px;
}

.fp-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.fp-avatar-placeholder {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff5900;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fp-logout-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.fp-logout-btn:hover {
  color: #ef5050;
}

.fp-logout-icon {
  width: 14px;
  height: 14px;
}

.fp-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  gap: 0.25rem;
  width: 70px;
}

.fp-page-num {
  color: #ef5050;
  font-weight: 700;
  font-size: 0.85rem;
}

.fp-page-sep {
  color: #334155;
  font-size: 0.75rem;
}

.fp-page-total {
  color: #475569;
  font-size: 0.8rem;
}
</style>