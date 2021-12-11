import React, { useEffect, useState } from 'react'

export default function Dropdown(props) {
    const { name, options } = props

    const [optionSelected, setOptionSelected] = useState(null)

    return (
        <div class="dropdown-btn" id={name}>
            <select class="btn btn-secondary" type="button" id={name}>

                {options.map((option, id) => {
                    return (
                        <option
                            key={id}
                            value={option}
                            class="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault();
                                setOptionSelected(option);

                            }}
                        >{option}</option>
                    )
                })}


            </select>

        </div>
    )
}
