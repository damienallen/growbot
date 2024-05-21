import {
    Container,
    createStyles,
    Grid,
    SimpleGrid,
    Skeleton,
    useMantineTheme,
    rem,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}))

const PRIMARY_COL_HEIGHT = rem(320)

export const Overview = () => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`

    return (
        <Container className={classes.container} size="sm" px="md">
            <h1>Overview</h1>
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
                <Grid gutter="md">
                    <Grid.Col>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    )
}
