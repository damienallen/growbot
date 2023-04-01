import { Container, createStyles, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
}))

const PRIMARY_COL_HEIGHT = rem(320)

export const Timelapse = () => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 3 - ${theme.spacing.md} * 0.75)`

    return (
        <Container className={classes.container} size="sm" px="md">
            <h1>Timelapse</h1>
            <Grid>
                <Grid.Col xs={12}><Skeleton height={320} radius="md" animate={false} /></Grid.Col>
                <Grid.Col xs={12}><Skeleton height={40} radius="md" animate={false} /></Grid.Col>
            </Grid>
        </Container>
    )
}