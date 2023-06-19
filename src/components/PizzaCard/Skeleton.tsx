import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import '../../scss/app.scss'

export const Skeleton: FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={305}
    height={500}
    viewBox="0 0 360 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="17" y="155" rx="0" ry="0" width="3" height="1" />
    <circle cx="180" cy="150" r="148" />
    <rect x="35" y="311" rx="10" ry="10" width="297" height="18" />
    <rect x="36" y="344" rx="10" ry="10" width="294" height="43" />
    <rect x="39" y="405" rx="10" ry="10" width="91" height="30" />
    <rect x="221" y="399" rx="15" ry="15" width="107" height="41" />
  </ContentLoader>
)
