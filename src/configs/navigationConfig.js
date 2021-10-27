import React from 'react'
import * as Icon from 'react-feather'
var user = JSON.parse(localStorage.getItem('user'))
const navigationConfig = [
    {
        id: 'home',
        title: 'Главная',
        type: 'item',
        icon: <Icon.Home size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/',
        role: ['admin', 'manager'],
    },
    {
        id: 'news',
        title: 'Новости',
        type: 'item',
        icon: <Icon.BookOpen size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/news',
        role: ['admin'],
    },
    {
        id: 'projects',
        title: 'Проекты',
        type: 'collapse',
        icon: <Icon.Box size={20} />,
        permissions: ['admin', 'editor'],
        children: [
            {
                id: 'projects_1',
                title: 'Проекты',
                type: 'item',
                icon: <Icon.Package size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/projects',
                role: ['admin'],
            },
            {
                id: 'projects_2',
                title: 'Фото Галерея',
                type: 'item',
                icon: <Icon.Sliders size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/pr_sliders',
                role: ['admin'],
            },
            {
                id: 'projects_3',
                title: 'Планировки',
                type: 'item',
                icon: <Icon.Layers size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/slider2',
                role: ['admin'],
            },
            {
                id: 'projects_4',
                title: 'Преимущество',
                type: 'item',
                icon: <Icon.Award size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/pr_advantages',
                role: ['admin'],
            },
            {
                id: 'projects_5',
                title: 'Контакты',
                type: 'item',
                icon: <Icon.Info size={20} />,
                permissions: ['admin', 'editor'],
                navLink: '/pages/pr_contacts',
                role: ['admin'],
            },
        ],
        navLink: '/pages/projects',
        role: ['admin'],
    },
    {
        id: 'video',
        title: 'Видео',
        type: 'item',
        icon: <Icon.Video size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/video',
        role: ['admin'],
    },
    // {
    //   id: "instagram",
    //   title: "Instagram",
    //   type: "item",
    //   icon: <Icon.Instagram size={20} />,
    //   permissions: ["admin", "editor"],
    //   navLink: "/pages/instagram",
    //   role: ['admin']
    // },
    {
        id: 'users',
        title: 'Пользователи',
        type: 'item',
        icon: <Icon.Users size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/users',
        role: ['admin'],
    },
    {
        id: 'team',
        title: 'Сотрудники',
        type: 'item',
        icon: <Icon.UserCheck size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/team',
        role: ['admin'],
    },
    // {
    //   id: "career",
    //   title: "Карьера",
    //   type: "item",
    //   icon: <Icon.Tablet size={20} />,
    //   permissions: ["admin", "editor"],
    //   navLink: "/pages/career",
    //   role: ['admin']
    // },
    // {
    //   id: "layouts",
    //   title: "Планировки",
    //   type: "item",
    //   icon: <Icon.Layout size={20} />,
    //   permissions: ["admin", "editor"],
    //   navLink: "/pages/layouts",
    //   role: ["admin"],
    // },
    {
        id: 'slider',
        title: 'Слайдер',
        type: 'item',
        icon: <Icon.Sliders size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/slider',
        role: ['admin'],
    },
    {
        id: 'application',
        title: 'Заявки',
        type: 'item',
        icon: <Icon.PhoneIncoming size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/application',
        role: ['admin', 'manager'],
    },
    {
        id: 'sale',
        title: 'Акции',
        type: 'item',
        icon: <Icon.Percent size={20} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/sale',
        role: ['admin'],
    },
]

let filterNavigationConfig = navigationConfig.filter((el) => {
    if (el.role?.includes(user?.status)) {
        return el
    }
})

export default filterNavigationConfig
