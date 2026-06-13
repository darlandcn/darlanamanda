import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export function usePhotoUpload() {
  const config = useRuntimeConfig()
  const projectUrl = config.public.supabaseProjectUrl as string
  const anonKey = config.public.supabaseAnonKey as string

  const uploading = ref(false)
  const error = ref<string | null>(null)

  async function uploadPhoto(file: File): Promise<string | null> {
    uploading.value = true
    error.value = null

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `momentos/momento-${Date.now()}.${ext}`

      const res = await fetch(
        `${projectUrl}/storage/v1/object/${fileName}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${anonKey}`,
            'apikey': anonKey,
            'Content-Type': file.type,
            'x-upsert': 'true',
          },
          body: file,
          signal: controller.signal,
        },
      )

      if (!res.ok) {
        throw new Error(`Upload falhou: ${res.status}`)
      }

      return `${projectUrl}/storage/v1/object/public/media/${fileName}`
    }
    catch (e: any) {
      if (e.name === 'AbortError') {
        error.value = 'A conexão demorou demais. Tenta de novo.'
      } else {
        error.value = e.message || 'Erro ao enviar foto'
      }
      return null
    }
    finally {
      clearTimeout(timeout)
      uploading.value = false
    }
  }

  return { uploadPhoto, uploading, error }
}
