'use client'
import { getBaseURL } from '@/lib/utils/config'
import { useSuspenseQuery } from '@tanstack/react-query'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'
const baseUrl = getBaseURL()

export function useWaitQuery(props: { wait: number }) {
    const query = useSuspenseQuery({
      queryKey: ['wait', props.wait],
      queryFn: async () => {
        const path = `/api/wait?wait=${props.wait}`
        const url = baseUrl + path
  
        const res: string = await (
          await fetch(url, {
            cache: 'no-store',
          })
        ).json()
        return res
      },
    })
  
    return [query.data as string, query] as const
  }