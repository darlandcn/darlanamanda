import { useRuntimeConfig } from '#app'

export const useMedia = () => {
  const config = useRuntimeConfig()
  const base = config.public.supabaseUrl
  return {
    img: (path: string) => `${base}/images/${path}`,
    vid: (path: string) => `${base}/videos/${path}`,
  }
}
