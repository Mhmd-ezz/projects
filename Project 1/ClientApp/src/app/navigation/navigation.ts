import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'workspace',
        title: 'workspace',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'Dashboard',
                title: 'Dashboard',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard',
                badge: {
                    title: 'Beta',
                    // translate: 'NAV.HOME.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'Patients',
                title: 'Patients',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'people',
                url: '/patients'
            },
            {
                id: 'Contacts',
                title: 'Contacts',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'contacts',
                url: '/contacts',
                badge: {
                    title: 'Beta',
                    // translate: 'NAV.HOME.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'Todos',
                title: 'Todos',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'check_box',
                url: '/todos',
                badge: {
                    title: 'Beta',
                    // translate: 'NAV.HOME.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'Schedule',
                title: 'Schedule',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'calendar_today',
                url: '/schedule',
                badge: {
                    title: 'Beta',
                    // translate: 'NAV.HOME.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'Tickets',
                title: 'Tickets',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',                
                icon: 'confirmation_number',
                url: '/tickets',
                badge: {
                    title: 'Beta',
                    // translate: 'NAV.HOME.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
        ]
    },
    {
        id: 'managment',
        title: 'managment',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'Settings',
                title: 'Settings',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'settings',
                url: '/settings'
            },
            {
                id: 'file_manager',
                title: 'File Manager',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'cloud',
                url: '/file-manager'
            }
        ]
    }
];
