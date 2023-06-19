import { FC } from 'react'
import { Dna } from 'react-loader-spinner'

export const Loading: FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}
