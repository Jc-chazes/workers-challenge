import * as React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  margin: 0 auto;
`

export const Label = styled.label`
  width: 200px;
`

enum CheckboxValue {
  SELECTAll = 'SelectAll',
  INDIA = 'India',
  USA = 'USA',
  FRANCE = 'France',
}

const arrCheckboxs = [
  {
    value: CheckboxValue.SELECTAll,
    label: 'Select All',
  },
  {
    value: CheckboxValue.INDIA,
    label: 'India',
  },
  {
    value: CheckboxValue.USA,
    label: 'USA',
  },
  {
    value: CheckboxValue.FRANCE,
    label: 'France',
  },
]

interface CheckboxProps {
  value: string
  name: string
  isChecked: boolean
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface InitialCheckedItems {
  SelectAll: boolean
  India: boolean
  USA: boolean
  France: boolean
}

const initialCheckedItems: InitialCheckedItems = {
  [CheckboxValue.SELECTAll]: false,
  [CheckboxValue.INDIA]: false,
  [CheckboxValue.USA]: false,
  [CheckboxValue.FRANCE]: false,
}

function Checkbox({ value, name, isChecked, label, onChange }: CheckboxProps) {
  return (
    <Label>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      {label}
    </Label>
  )
}

function getCheckboxParentChecked(checkedItems: InitialCheckedItems) {
  return Object.keys(checkedItems)
    .filter((item) => item !== CheckboxValue.SELECTAll)
    .every((item) => checkedItems[item as keyof InitialCheckedItems])
}

export function App() {
  const [checkedItems, setCheckedItems] = React.useState<InitialCheckedItems>(
    initialCheckedItems,
  )

  const onChangeCheckboxValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target

    if (value === CheckboxValue.SELECTAll) {
      setCheckedItems((items: InitialCheckedItems) =>
        Object.keys(items).reduce((acc, key) => {
          acc[key as keyof InitialCheckedItems] = checked
          return acc
        }, {} as InitialCheckedItems),
      )
      return
    }

    const newCheckedItems: InitialCheckedItems = {
      ...checkedItems,
      [value]: checked,
    }

    setCheckedItems({
      ...newCheckedItems,
      [CheckboxValue.SELECTAll]: getCheckboxParentChecked(newCheckedItems),
    })
  }

  return (
    <Container>
      {arrCheckboxs.map((checkbox) => {
        return (
          <Checkbox
            key={checkbox.value}
            name={checkbox.value}
            value={checkbox.value}
            label={checkbox.label}
            isChecked={checkedItems[checkbox.value]}
            onChange={onChangeCheckboxValue}
          />
        )
      })}
    </Container>
  )
}
