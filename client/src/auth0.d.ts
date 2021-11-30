// src/auth0.d.ts
import type Vue from 'vue'
import type { Auth0Client } from '@auth0/auth0-spa-js'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      loginWithPopup: Auth0Client['loginWithPopup']
      handleRedirectCallback: Auth0Client['handleRedirectCallback']
      loginWithRedirect: Auth0Client['loginWithRedirect']
      getIdTokenClaims: Auth0Client['getIdTokenClaims']
      getTokenSilently: Auth0Client['getTokenSilently']
      getTokenWithPopup: Auth0Client['getTokenWithPopup']
      logout: Auth0Client['logout']
    }
  }
}