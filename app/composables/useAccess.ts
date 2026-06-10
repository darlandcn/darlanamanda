import { ref } from 'vue'

export function useAccess() {
  const SECRET_DATE = '02/02/2026' // dd/mm/aaaa

  const attempts     = ref(0)
  const errorMessage = ref('')
  const isShaking    = ref(false)

  const errorMessages = [
    'Hmm... essa não é a data. Pensa melhor. 💭',
    'Quase... mas não. Você foi lá? 😏',
    'Tenho certeza que você se lembra disso. 🥺',
    'Vai na memória afetiva. Você sabe.',
    'Tão perto, mas tão longe... 🌙',
  ]

  function validate(date: string): boolean {
    if (date === SECRET_DATE) return true

    attempts.value++
    errorMessage.value = errorMessages[
      Math.min(attempts.value - 1, errorMessages.length - 1)
    ] ?? 'Data incorreta. Tente novamente.'
    isShaking.value = true
    setTimeout(() => { isShaking.value = false }, 600)
    return false
  }

  function clearError() {
    errorMessage.value = ''
    isShaking.value    = false
  }

  return { validate, attempts, errorMessage, isShaking, clearError }
}
