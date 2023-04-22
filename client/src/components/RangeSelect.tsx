import { clsx, createStyles, rem } from '@mantine/core'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { IconArrowAutofitWidth } from '@tabler/icons-react'

import dayjs from 'dayjs'
import { useStores } from '../stores/root'
import { Calendar, DateInput, DatePickerInput, DateValue, DatesRangeValue, MonthPickerInput } from '@mantine/dates'

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
    }
}))


const getDay = (date: Date) => {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

const startOfWeek = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date) - 1);
}

const endOfWeek = (date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - getDay(date))))
        .endOf('date')
        .toDate();
}

const isInWeekRange = (date: Date, value: Date | undefined) => {
    return value && dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value));
}


export const RangeSelect = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()
    const [hovered, setHovered] = useState<Date | undefined>(undefined);
    const [value, setValue] = useState<Date | undefined>(undefined);


    const weekCalendar = <Calendar
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
                onClick: () => setValue(date),
            }
        }}
    />

    const setDay = (date: DateValue) => {
        timelapse.setStartDate(date)
        timelapse.setStopDate(date)
    }

    const setWeek = (dateRange: DatesRangeValue) => {
        timelapse.setStartDate(dateRange[0])
        timelapse.setStopDate(dateRange[1])
    }

    const setMonth = (date: DateValue) => {
        timelapse.setStartDate(date)
        timelapse.setStopDate(date)
        console.log(date)
    }

    const setCustomRange = (dateRange: DatesRangeValue) => {
        timelapse.setStartDate(dateRange[0])
        timelapse.setStopDate(dateRange[1])
    }


    let select = null
    switch (timelapse.windowSize) {
        case 'Day':
            select = <DateInput
                icon={<IconArrowAutofitWidth size={rem(18)} />}
                classNames={{
                    root: classes.root,
                }}
                valueFormat='YYYY-MM-DD'
                placeholder='Pick day'
                value={timelapse.startDate}
                onChange={setDay}
            />
            break
        case 'Week':
            select = <DatePickerInput
                icon={<IconArrowAutofitWidth size={rem(18)} />}
                classNames={{
                    root: clsx(classes.root, classes.wide),
                }}
                type='range'
                placeholder='Pick week'
                valueFormat='YYYY-MM-DD'
                value={timelapse.dateRange}
                onChange={setWeek}
            />
            break
        case 'Month':
            select = <MonthPickerInput
                icon={<IconArrowAutofitWidth size={rem(18)} />}
                classNames={{
                    root: classes.root,
                }}
                placeholder='Pick month'
                valueFormat='YYYY-MM-DD'
                value={timelapse.startDate}
                onChange={setMonth}
                mx='auto'
            />
            break
        case 'Custom':
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
        default:
        // pass
    }

    return select
})