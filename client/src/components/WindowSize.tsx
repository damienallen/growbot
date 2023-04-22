import { Select, createStyles, rem } from "@mantine/core"
import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { IconCalendarTime } from '@tabler/icons-react'

import { IconChevronDown } from "@tabler/icons-react"
import { useStores } from "../stores/root"

const useStyles = createStyles(() => ({
    root: {
        width: 120
    },
    rightSection: {
        pointerEvents: 'none'
    }
}))

export const WindowSize = observer(() => {
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
            icon={<IconCalendarTime size={rem(18)} />}
            rightSection={<IconChevronDown size={18} />}
            rightSectionWidth={30}
            classNames={{
                root: classes.root,
                rightSection: classes.rightSection
            }}
            data={['Day', 'Week', 'Month', 'Custom']}
        />
    )
})