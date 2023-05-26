/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { useCallback } from 'react'
import { setSearchValue } from '../../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'

const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  const dispatch = useDispatch()

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 500),
    []
  )

  const onChangeInput = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))

    inputRef.current.focus()
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.iconDelete}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  )
}

export default Search
