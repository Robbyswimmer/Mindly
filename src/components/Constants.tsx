import { AppPage } from '../declarations';
import { home, list, calendar, analytics, cog, chatbubbleEllipses} from 'ionicons/icons';
const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'Messenger',
    url: '/messenger',
    icon: chatbubbleEllipses
  },
  {
    title: 'Calendar Review',
    url: '/calendar',
    icon: calendar
  },
  {
    title: 'Resources',
    url: '/resources',
    icon: list
  },
  {
    title: 'Statistics',
    url: '/statistics',
    icon: analytics
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: cog
  },
];
export default appPages;
