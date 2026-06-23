export const useApi = () => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const request = async <T>(url: string, options: Record<string, unknown> = {}): Promise<T> => {
    return $fetch<T>(`${config.public.apiBase}${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        ...(options.headers as Record<string, string> || {}),
      },
    })
  }

  return { request }
}