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
    route: '/about',
    icon: 'pi pi-info-circle',
  },
  {
    label: 'menu.about',
    route: '/faq',
    icon: 'pi pi-question-circle',
  },
]
