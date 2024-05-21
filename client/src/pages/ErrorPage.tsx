import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core'
import { useRouteError } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(120),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(36),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}))

export const ErrorPage = () => {
    const { classes } = useStyles()
    const error: any = useRouteError()
    console.error(error)

    return (
        <Container className={classes.root}>
            <div className={classes.label}>Error</div>
            <Title className={classes.title}>{error.statusText || error.message}</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Unfortunately, the application is unable to serve your request.
            </Text>
            <Group position="center">
                <a href="/">
                    <Button variant="subtle" size="md">
                        Back to home page
                    </Button>
                </a>
            </Group>
        </Container>
    )
}
