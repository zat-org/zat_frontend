import type { IHeroSlide } from '~/features/website/types/IHeroSlide'
import { mapHeroSlides, type StrapiEntity, type StrapiHeroSlideAttributes } from '~/features/shared/utils/strapiMappers'

const FALLBACK_SLIDES: IHeroSlide[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/zat-baloot-1/1280/720',
    largeUrl: null,
    alt: 'طريقك للاحتراف',
    title: 'طريقك للاحتراف',
    description: 'ابدأ رحلتك من أساسيات البلوت لحد استراتيجيات اللعب الاحترافية، مع شرح عملي، تحليل جولات حقيقية، وتكتيكات تساعدك تطور مستواك وتنافس بثقة.',
    buttonCTA: null,
    buttonIconName: null,
    url: null,
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/zat-baloot-2/1280/720',
    largeUrl: null,
    alt: 'أتقن استراتيجيات السكة',
    title: 'أتقن استراتيجيات السكة',
    description: 'تعلّم كيف تبني اللعب خطوة بخطوة، وتفهم توقيت السكة، ومتى تضغط ومتى تنتظر — مع أمثلة من جولات حقيقية.',
    buttonCTA: null,
    buttonIconName: null,
    url: null,
  },
]

export async function useHeroSlides() {
  const toMediaUrl = useMediaUrl()

  const { data, pending, error, refresh } = await useStrapiCollection<
    { data?: StrapiEntity<StrapiHeroSlideAttributes>[] | null },
    IHeroSlide[]
  >(
    'hero:slides',
    'hero-swipers',
    { populate: { Image: { fields: ['url', 'formats', 'alternativeText'] } }, sort: 'createdAt:asc' },
    response => mapHeroSlides(response, toMediaUrl),
  )

  const slides = computed(() => {
    const fromApi = data.value ?? []
    return fromApi.length > 0 ? fromApi : FALLBACK_SLIDES
  })

  const activeSlide = ref(0)
  const currentSlide = computed(() => slides.value[activeSlide.value] ?? slides.value[0])

  watch(slides, () => {
    activeSlide.value = 0
  })

  function onSlideChange(event: CustomEvent) {
    const swiper = event.detail[0]
    activeSlide.value = swiper?.realIndex ?? 0
  }

  function goToSlide(index: number, swiperRef: Ref<HTMLElement | null>) {
    const el = swiperRef.value as unknown as {
      swiper?: { slideToLoop: (i: number) => void, slideTo: (i: number) => void }
    }

    if (slides.value.length > 1) {
      el?.swiper?.slideToLoop?.(index) ?? el?.swiper?.slideTo?.(index)
    }
  }

  return {
    slides,
    currentSlide,
    activeSlide,
    pending,
    error,
    refresh,
    onSlideChange,
    goToSlide,
  }
}
