export interface ValentinesConfig {
  secretDate: string
  redirectPath: string
}

export interface AppConfig {
  valentines: ValentinesConfig
}

export interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  duration: number
  delay: number
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
  image?: string
}

export interface GalleryItem {
  id: number
  src: string
  alt: string
  caption?: string
}

export interface Letter {
  id: number
  title: string
  content: string
  date?: string
}
