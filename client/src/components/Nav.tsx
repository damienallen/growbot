import { useState } from 'react'
import { Link } from "react-router-dom"
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core'
import {
    IconLayoutBoardSplit,
    IconCamera,
    IconSettings,
    IconChartLine,
} from '@tabler/icons-react'

import { HeaderIcon } from './HeaderIcon'
import { appVersion } from '../App'
import { ThemeToggle } from './ThemeToggle'

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    footer: {
        marginTop: theme.spacing.md,
        textAlign: 'center'
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}))

const data = [
    { link: '/', label: 'Overview', icon: IconLayoutBoardSplit },
    { link: '/timeseries', label: 'Timeseries', icon: IconChartLine },
    { link: '/timelapse', label: 'Timelapse', icon: IconCamera },
    { link: '/settings', label: 'Settings', icon: IconSettings },
]

export const Nav = () => {
    const { classes, cx } = useStyles()
    const [active, setActive] = useState('Overview')

    const links = data.map((item) => (
        <div onClick={() => setActive(item.label)} key={item.label}>
            <Link to={item.link} className={cx(classes.link, { [classes.linkActive]: item.label === active })}>
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </Link>
        </div>
    ))

    return (
        <Navbar height={700} width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <HeaderIcon />
                    <ThemeToggle />
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <Code sx={{ fontWeight: 600 }}>v{appVersion}</Code>
            </Navbar.Section>
        </Navbar>
    )
}