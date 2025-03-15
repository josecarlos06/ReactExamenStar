import React from 'react';
import useAutocomplete from '@mui/material/useAutocomplete';
import { styled } from '@mui/system';
import LoaderCircle from './LoaderCircle';

type ComboboxProps = {
   label: string;
   options: { title: string;[key: string]: any }[];
   getOptionLabel?: (option: { title: string;[key: string]: any }) => string;
   loading: boolean
};
const Listbox = styled('ul')(({ theme }) => ({

   '& li.Mui-focused': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
   },
   '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
   },
   ...theme.applyStyles('dark', {
      backgroundColor: '#000',
   }),
}));
const Combobox: React.FC<ComboboxProps> = ({ options,loading, getOptionLabel = (option) => option.title }) => {
   const {
      getRootProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
   } = useAutocomplete({
      id: 'use-autocomplete-demo',
      options: options,
      getOptionLabel: getOptionLabel,
   });

   return (
      <div className='w-full'>
         <div {...getRootProps()} className='relative'>
            <input
               placeholder='Buscar...'
               className='w-full bg-gray-50 px-2 py-2 rounded-lg border border-gray-200 placeholder:text-xs pr-6d'
               {...getInputProps()}
            />
            {
               loading
                  ? <div className='absolute top-2 right-3'>
                     <LoaderCircle color='zinc-200' />
                  </div>
                  : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 absolute top-3 right-3">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
            }
         </div>
         {!loading && groupedOptions.length > 0 ? (
            <Listbox
               {...getListboxProps()}
               className='fixed bg-white border border-gray-200 rounded-lg p-2 flex flex-col max-h-60 overflow-auto'
            >
               {groupedOptions.map((option, index) => {
                  const { key, ...optionProps } = getOptionProps({ option, index });
                  return (
                     <li
                        key={key}
                        {...optionProps}
                        className='hover:bg-gray-200 px-2 py-1 rounded cursor-pointer focus:bg-red-300 active:bg-red-50'
                     >
                        {getOptionLabel(option)}
                     </li>
                  );
               })}
            </Listbox>
         ) : null}
      </div>
   );
};

export default Combobox;
