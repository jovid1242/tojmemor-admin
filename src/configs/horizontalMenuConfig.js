import React from 'react'
import * as Icon from 'react-feather'
var user = JSON.parse(localStorage.getItem('user'))

const horizontalMenuConfig = [
    {
        id: 'home',
        title: 'Home',
        type: 'item',
        icon: <Icon.Home size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/',
    },
    {
        id: 'news',
        title: 'Новости',
        type: 'item',
        icon: <Icon.BookOpen size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/news',
    },
    {
        id: 'projects',
        title: 'Проекты',
        type: 'collapse',
        icon: <Icon.Clipboard size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/projects',
        children: [
            {
                id: 'projects_1',
                title: 'Проекты',
                type: 'item',
                icon: <Icon.BookOpen size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/projects',
                role: ['admin'],
            },
        ],
    },
    {
        id: 'video',
        title: 'Видео',
        type: 'item',
        icon: <Icon.Video size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/video',
    },
    // {
    //   id: "instagram",
    //   title: "Инстаграм",
    //   type: "item",
    //   icon: <Icon.Instagram size={20} />,
    //   permissions: ["admin", "editor"],
    //   navLink: "/pages/instagram",
    // },
    {
        id: 'users',
        title: 'Пользователи',
        type: 'item',
        icon: <Icon.Users size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/team',
    },
    // {
    //   id: "career",
    //   title: "Карьера",
    //   type: "item",
    //   icon: <Icon.Tablet size={20} />,
    //   permissions: ["admin", "editor"],
    //   navLink: "/pages/career"
    // },
    {
        id: 'slider',
        title: 'Слайдер',
        type: 'item',
        icon: <Icon.Sliders size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/slider',
    },
    {
        id: 'application',
        title: 'Заявки',
        type: 'item',
        icon: <Icon.MessageSquare size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/application',
        role: ['admin', 'manager'],
    },
    {
        id: 'sale',
        title: 'Акции',
        type: 'item',
        icon: <Icon.Slack size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/sale',
        role: ['admin'],
    },
    {
        id: 'team',
        title: 'Сотрудники',
        type: 'item',
        icon: <Icon.Coffee size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/team',
        role: ['admin'],
    },
]

let filterNavigationConfig = horizontalMenuConfig.filter((el) => {
    if (el.role?.includes(user?.status)) {
        return el
    }
})
export default filterNavigationConfig
