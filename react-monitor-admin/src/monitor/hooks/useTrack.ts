import { useCallback } from 'react'
import { monitor } from '@/monitor'

/**
 * 命令式埋点 hook
 * 用法：
 * ```tsx
 * const { track } = useTrack()
 * <button onClick={() => track('btn_submit', '提交表单', { formId: 'login' })}>提交</button>
 * ```
 */
export function useTrack() {
  const track = useCallback(
    (eventId: string, eventName: string, extra?: Record<string, unknown>) => {
      monitor.track(eventId, eventName, extra)
    },
    []
  )

  return { track }
}
