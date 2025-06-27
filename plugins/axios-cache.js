import { setupCache } from 'axios-cache-adapter'

export default function ({ $axios }) {
  const cache = setupCache({
    maxAge: 5 * 60 * 1000, // 5 minutes
  })

  $axios.defaults.adapter = cache.adapter
}