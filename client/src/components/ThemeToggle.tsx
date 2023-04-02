import { Switch, Group, useMantineColorScheme, useMantineTheme, Tooltip } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

export const ThemeToggle = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    useHotkeys([['alt+D', () => toggleColorScheme()]])

    return (
        <Tooltip label="Toggle: Alt + D">
            <Group position="center" my={30}>
                <Switch
                    checked={colorScheme === 'dark'}
                    onChange={() => toggleColorScheme()}
                    size="lg"
                    onLabel={<IconSun color={theme.white} stroke={1.5} />}
                    offLabel={<IconMoonStars color={theme.colors.gray[6]} stroke={1.5} />}
                />
            </Group>
        </Tooltip>
    )
}