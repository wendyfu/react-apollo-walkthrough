import * as React from 'react'
import { SubscriptionState } from '../__generated__/types'

interface DropdownProps extends React.HTMLAttributes<HTMLSelectElement> {
    selected: string,
    reference: React.Ref<HTMLSelectElement>,
    options: string[]
}

export default class Dropdown extends React.Component<DropdownProps> {

    render() {
        const { selected, onChange, reference, options } = this.props
        return (
            <select value={selected} onChange={onChange} ref={reference}>
                {options.map(key => <option key={`filter-${key}`} value={key}>{key}</option>)}
            </select>
        )
    }
}