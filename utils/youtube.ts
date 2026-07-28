/** Extract a YouTube video id from common watch / short / embed URLs. */
export function extractYoutubeVideoId(url: string | null | undefined): string | null {
    if (!url) return null

    try {
        const parsed = new URL(url.trim())
        const host = parsed.hostname.replace(/^www\./, '')

        if (host === 'youtu.be') {
            const id = parsed.pathname.split('/').filter(Boolean)[0]
            return id || null
        }

        if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
            if (parsed.pathname === '/watch') {
                return parsed.searchParams.get('v')
            }
            const parts = parsed.pathname.split('/').filter(Boolean)
            if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live' || parts[0] === 'v') {
                return parts[1] || null
            }
        }
    }
    catch {
        return null
    }

    return null
}

export function youtubeThumbnailUrl(videoId: string): string {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
