function customizeZatIcon(content: string, _name: string, prefix: string) {
  if (prefix !== "zat") return content

  return content
    .replace(/<g fill="none">/g, '<g fill="currentColor">')
    .replace(/fill="(?!none|currentColor)[^"]+"/gi, 'fill="currentColor"')
}

export default defineAppConfig({
  icon: {
    mode: "svg",
    customize: customizeZatIcon,
  },

  ui: {
    colors: {
      primary: "zat",
      neutral: "neutral",
      white: "white",
    },

    icons: {
      light: "zat:sun",
      dark: "zat:moon",
      chevronDown: "i-heroicons-chevron-down-20-solid",
    },

    button: {
      slots: {
        base: "font-bold rounded-zat-sm transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]",
      },

      variants: {
        square: {
          true: {
            base: "size-12 h-full flex items-center justify-center",
            leadingIcon: "size-8",
          },
        },
      },

      compoundVariants: [
        {
          color: "neutral",
          variant: "solid",
          class:
            "bg-black! text-white! hover:bg-black/90! dark:bg-white! dark:text-black! dark:hover:bg-white/90! ring-0",
        },
        {
          color: "white",
          variant: "solid",
          class: "bg-white! text-black! hover:bg-white/90! ring-0",
        },
        {
          color: "white",
          variant: "outline",
          class: "bg-transparent! text-white! ring-white! hover:bg-white/10! ring-0",
        },
      ],

      defaultVariants: {
        size: "lg",
      },
    },

    header: {
      slots: {
        root: " bg-nav-bar border-none shadow-zat-sm sticky top-0 z-50 backdrop-blur-none h-auto py-2  ",

        container:
          "page-container gap-2 lg:gap-4 max-w-screen md:grid md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto] md:py-3 lg:flex lg:flex-row lg:items-center lg:h-full lg:py-0",

        left: "flex items-center gap-2 shrink-0 md:col-start-1 md:row-start-1 lg:max-w-[104px]",

        center:
          "hidden md:flex md:col-span-2 md:row-start-2 md:justify-center md:w-full lg:col-auto lg:row-auto lg:flex-1 lg:min-h-14",

        right:
          "flex items-center justify-end shrink-0 md:col-start-2 md:row-start-1 md:justify-self-end lg:max-w-[104px]",

        title: "shrink-0 p-0 flex items-center h-12 max-w-[104px]",

        toggle: "md:hidden text-white hover:bg-white/10",

        body: "p-0 overflow-hidden bg-surface-off-base text-text-body",

        header:
          "hidden",
      },
    },

    navigationMenu: {
      slots: {
        viewport:
          "rounded-none border-0 border-t border-surface-tone shadow-zat !bg-white dark:!bg-white ring-0 w-full",
        content:
          "w-full py-8 px-[var(--spacing-page)] !bg-white dark:!bg-white",
        viewportWrapper:
          "fixed top-[7.5rem] md:top-[7.5rem] lg:top-17 inset-x-0 flex w-screen start-0 end-0 !bg-white dark:!bg-white",
      },

      compoundVariants: [
        {
          orientation: "horizontal",

          variant: "link",

          class: {
            root: "justify-center",

            list: "flex items-center justify-center gap-4 flex-wrap",

            item: "py-0",

            link: "h-14 px-4 py-2 gap-1 font-bold text-xl leading-9 text-text-on-action rounded-zat-sm hover:bg-white/10 data-[state=open]:bg-white/15 before:hidden",

            linkTrailingIcon:
              "text-text-on-action size-6 shrink-0 group-data-[state=open]:rotate-180",

            linkLabel: "text-text-on-action text-xl leading-9",
          },
        },
      ],
    },

    separator: {
      slots: {
        border: "border-surface-tone",
      },
    },

    notifications: {
      position: "top-0 right-0 bottom-auto",
    },
  },
});
