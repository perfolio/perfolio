import { useRouter, } from "next/router"
import nProgress from "nprogress"
import React, { useEffect, } from "react"

nProgress.configure({
  template: `
<div class="bg-gradient-to-r from-transparent to-primary fixed z-50 top-0 left-0 w-full h-0.5" role="bar"></div>
`,
},)

export const PageloadIndicator: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeStart", nProgress.start,)
    router.events.on("routeChangeComplete", nProgress.done,)
    router.events.on("routeChangeError", nProgress.done,)

    return () => {
      router.events.off("routeChangeStart", nProgress.start,)
      router.events.off("routeChangeComplete", nProgress.done,)
      router.events.off("routeChangeError", nProgress.done,)
    }
  }, [router,],)

  return null
}
