import { defineStore } from 'pinia'

// Описуємо, які поля має користувач
interface User {
    id: number           // id користувача
    name: string         // ім'я користувача
    email: string        // email користувача
    role: 'guest' | 'photographer' | 'admin' // роль користувача
}

interface UserState {
    user: User | null        // сам користувач або null, якщо не увійшов
    isAuthenticated: boolean // чи залогінений користувач
}

// Створюємо магазин користувача через Pinia
export const useUserStore = defineStore('user', {
    // користувача немає, не авторизований (початковий стан)
    state: (): UserState => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        // Зберігаємо дані користувача і ставимо статус авторизований
        setUser(user: User) {
            this.user = user
            this.isAuthenticated = true
        },
        // Вихід з акаунту
        logout() {
            this.user = null
            this.isAuthenticated = false
        },
    },
    getters: {
        // Повертаємо ім'я користувача, якщо він є
        userName: (state) => state.user?.name || '',
        // Повертаємо email користувача, якщо він є
        userEmail: (state) => state.user?.email || '',
        // Повертаємо id користувача, якщо він є
        userId: (state) => state.user?.id || null,
        // Повертаємо роль користувача, якщо він є
        userRole: (state) => state.user?.role || null,
        // Повертаємо статус авторизації
        isLoggedIn: (state) => state.isAuthenticated,
    },
})