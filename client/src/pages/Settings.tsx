import { Container, Card, Group, Switch, Text, createStyles, rem } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },
    },
    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },
    title: {
        lineHeight: 1,
    },
}))

const data = [
    {
        "title": "Low water",
        "description": "Water tank level below fill sensor"
    },
    {
        "title": "Overheating",
        "description": "Bucket air temperature exceeds maxiumum thredhold"
    },
    {
        "title": "Server health",
        "description": "Issues with the backend or crony"
    },
]


export const Settings = () => {
    const { classes } = useStyles()

    const items = data.map((item) => (
        <Group position="apart" className={classes.item} noWrap spacing="xl">
            <div>
                <Text>{item.title}</Text>
                <Text size="xs" color="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
        </Group>
    ))

    return (
        <Container className={classes.container} size="sm" px="md">
            <h1>Settings</h1>
            <Card withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="lg" className={classes.title} fw={500}>
                    Configure notifications
                </Text>
                <Text fz="xs" c="dimmed" mt={3} mb="xl">
                    Choose what notifications you want to receive"
                </Text>
                {items}
            </Card>
        </Container>
    )
}