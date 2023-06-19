import { FC, memo } from 'react'

type CategoriesProps = {
  value: number
  onClickCategory: (idx: number) => void
}

const category = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: FC<CategoriesProps> = memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {category.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={value === i ? 'active' : ''}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
