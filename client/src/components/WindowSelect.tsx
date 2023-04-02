import { Select, createStyles, rem } from "@mantine/core"
import { useEffect, useState } from "react"
import { observer } from "mobx-react"

import { IconChevronDown } from "@tabler/icons-react"
import { useStores } from "../stores"

const useStyles = createStyles(() => ({
    root: {
        maxWidth: 100
    },
    rightSection: {
        pointerEvents: 'none'
    }
}))

export const WindowSelect = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()
    const [value, setValue] = useState('Day')

    useEffect(() => {
        setValue(timelapse.windowSize)
    }, [timelapse.windowSize])

    return (
        <Select
            value={value}
            onChange={timelapse.setWindowSize}
            rightSection={<IconChevronDown size={18} />}
            rightSectionWidth={30}
            classNames={{
                root: classes.root,
                rightSection: classes.rightSection
            }}
            data={['Day', 'Week', 'Month']}
        />
    )
})