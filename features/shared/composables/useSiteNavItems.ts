import type { NavigationMenuItem } from "@nuxt/ui";

export function useSiteNavItems() {
  const route = useRoute();

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: "الفرق",
      slot: "teams",
      children: [
        { label: 'جميع الفرق', to: '/teams', icon: 'zat:people', row: 1 },
        { label: 'ابرز اللاعبين', to: '/#players', icon: 'zat:profile', row: 1 },
      ],
    },
    {
      label: 'البطولات',
      slot: 'tournaments',
      children: [
        { label: 'جميع البطولات', to: '/championships', icon: 'zat:cup', row: 1 },
        { label: 'البطولات القادمة', to: '/championships/upcoming', icon: 'zat:calendar', row: 1 },
        { label: 'البطولات السابقة', to: '/championships/done', icon: 'zat:menu-board', row: 1 },
        { label: 'بطولة الحزام', to: '/championships/hezam', row: 2 },
        { label: 'بطولة السوبر', to: '/championships/super', row: 2 },
        { label: 'بطولة الكأس', to: '/championships/cup', row: 2 },
        { label: 'بطولة الجمهور', to: '/join-us', row: 2 },
      ],
    },

    {
      label: "الاخبار",
      to: "/blogs?pageNum=1",
      active: route.path.startsWith("/blogs"),
      color: "primary",
    },
    {
      label: "الوظائف",
      to: "/jobs?pageNum=1",
      active: route.path.startsWith("/jobs"),
      color: "primary",
    },
    {
      label: "تعلم البلوت",
      to: "/learn-baloot",
      active: route.path.startsWith("/learn-baloot"),
      color: "primary",
    },
  ]);

  return { items };
}
