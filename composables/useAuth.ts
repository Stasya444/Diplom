import { useState } from 'nuxt/app'

export const useAuth = () => useState<any>('auth', () => null)
