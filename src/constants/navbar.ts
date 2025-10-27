export const navItems = [
  {
    label: 'menu.home',
    route: '/',
    icon: 'pi pi-home',
  },
  {
    label: 'menu.view',
    icon: 'pi pi-database',
    items: [
      {
        label: 'menu.view.flowchart',
        route: '/view/flowchart/',
        icon: 'pi pi-chart-scatter',
      },
      {
        label: 'menu.view.localization',
        route: '/view/localization/',
        icon: 'pi pi-globe',
      },
      {
        label: 'menu.view.res',
        route: '/view/resource/',
        icon: 'pi pi-images',
      },
    ],
  },
  {
    label: 'menu.about',
    icon: 'pi pi-info-circle',
    items: [
      {
        label: 'menu.about.site',
        route: '/about',
        icon: 'pi pi-sitemap',
      },
      { label: 'menu.about.changelog', route: '/changelogs', icon: 'pi pi-pencil' },
    ],
  },
  {
    label: 'menu.faq',
    route: '/faq',
    icon: 'pi pi-question-circle',
  },
]
