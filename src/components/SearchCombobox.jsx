import { useState } from 'react'

// Headless UI
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'

// Constants
import { germanyCities } from '../constants'

// React Icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export default function SearchCombobox({selectedCity, dispatch}) {
  const [city, setCity] = useState('')

  const filteredCities =
    city === ''
      ? germanyCities
      : germanyCities.filter((cities) => {
          return cities.toLowerCase().includes(city.toLowerCase())
        })   

  return (
    <>
      <Combobox as="div" value={selectedCity} onChange={(value) => dispatch({type: "selectedCity", payload: value})} className="border-2 border-gray-300 rounded h-full outline-blue-200">
        <div className="relative">
          <ComboboxInput
            className={'w-full h-[2.5rem] rounded border-none bg-white py-1 pl-2 pr-8 text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'} placeholder='All cities'
            displayValue={(city) => city}
            onChange={(e) => setCity(e.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <MdOutlineKeyboardArrowDown className="text-2xl fill-black/60 group-data-[hover]:fill-black" />
            
          </ComboboxButton> 
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setCity('')}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded border-2 border-gray-300 bg-white mt-1 p-1 [--anchor-gap:var(--spacing-1)] h-[65%] empty:hidden z-20"
          >
            {filteredCities.map((city, index) => (
              <ComboboxOption
                key={index}
                value={city} 
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10 z-20"
              >
                <FaCheck className="invisible size-4 fill-black group-data-[selected]:visible" />
                <div className="text-sm/6 text-black">{city}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </>
  )
}
