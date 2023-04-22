import { Button, Popover, clsx, createStyles, rem } from '@mantine/core'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { IconArrowAutofitWidth } from '@tabler/icons-react'

import dayjs from 'dayjs'
import { useStores } from '../stores/root'
import { Calendar, DateInput, DatePickerInput, DateValue, DatesRangeValue, MonthPickerInput } from '@mantine/dates'
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from '../stores/TimelapseStore'

const useStyles = createStyles(() => ({
    root: {
        width: 130,
        '& button': {
            paddingTop: '1px !important',
            paddingBottom: '1px !important'
        }
    },
    wide: {
        width: 220
    },
    week: {
        '& .mantine-Popover-dropdown': {
            display: 'none'
        }
    }
}))



const isInWeekRange = (date: Date, value: Date | undefined) => {
    return value && dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value));
}


export const RangeSelect = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()
    const [hovered, setHovered] = useState<Date | undefined>(undefined)
    const [value, setValue] = useState<Date | undefined>(undefined)


    const setDay = (date: DateValue) => {
        timelapse.setStartDate(dayjs(date).startOf('day').toDate())
        timelapse.setStopDate(dayjs(date).endOf('day').toDate())
    }

    const setWeek = (date: DateValue) => {
        setValue(date === null ? undefined : date)
        if (date) {
            timelapse.setStartDate(dayjs(startOfWeek(date)).add(1, 'day').toDate())
            timelapse.setStopDate(endOfWeek(date))
        }
    }

    const setMonth = (date: DateValue) => {
        if (date) {
            timelapse.setStartDate(startOfMonth(date))
            timelapse.setStopDate(endOfMonth(date))
        }
    }

    const setCustomRange = (dateRange: DatesRangeValue) => {
        timelapse.setStartDate(dayjs(dateRange[0]).endOf('day').toDate())
        timelapse.setStopDate(dayjs(dateRange[1]).endOf('day').toDate())
    }


    const excludeEmpty = (date: Date) => {
        const dateStr = dayjs(date).startOf('day').format()
        return !timelapse.captureDates.includes(dateStr)
    }

    let select = null
    switch (timelapse.windowSize) {
        case 'Day':
            select =
                <DateInput
                    icon={<IconArrowAutofitWidth size={rem(18)} />}
                    classNames={{
                        root: classes.root,
                    }}
                    excludeDate={excludeEmpty}
                    valueFormat='YYYY-MM-DD'
                    placeholder='Pick day'
                    value={timelapse.startDate}
                    onChange={setDay}
                />

            break
        case 'Week':
            select = <Popover position="bottom" shadow="md">
                <Popover.Target>
                    <DatePickerInput
                        icon={<IconArrowAutofitWidth size={rem(18)} />}
                        classNames={{
                            root: clsx(classes.root, classes.wide, classes.week),
                        }}
                        type='range'
                        placeholder='Pick week'
                        valueFormat='YYYY-MM-DD'
                        value={timelapse.dateRange}
                    />
                </Popover.Target>
                <Popover.Dropdown>
                    <Calendar
                        withCellSpacing={false}
                        getDayProps={(date: Date) => {
                            const isHovered = isInWeekRange(date, hovered)
                            const isSelected = isInWeekRange(date, value)
                            const isInRange = isHovered || isSelected
                            return {
                                onMouseEnter: () => setHovered(date),
                                onMouseLeave: () => setHovered(undefined),
                                inRange: isInRange,
                                firstInRange: isInRange && date.getDay() === 1,
                                lastInRange: isInRange && date.getDay() === 0,
                                selected: isSelected,
                                onClick: () => setWeek(date),
                            }
                        }}
                    />
                </Popover.Dropdown>
            </Popover>
            break
        case 'Month':
            select = <MonthPickerInput
                icon={<IconArrowAutofitWidth size={rem(18)} />}
                classNames={{
                    root: classes.root,
                }}
                placeholder='Pick month'
                valueFormat='YYYY-MM'
                value={timelapse.startDate}
                onChange={setMonth}
                mx='auto'
            />
            break
        default:
            select = <DatePickerInput
                icon={<IconArrowAutofitWidth size={rem(18)} />}
                classNames={{
                    root: clsx(classes.root, classes.wide),
                }}
                type='range'
                placeholder='Pick range'
                valueFormat='YYYY-MM-DD'
                value={timelapse.dateRange}
                onChange={setCustomRange}
            />
            break
    }

    return select
})