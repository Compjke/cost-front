import { ICost } from '../../../types'
import { CostEl } from '../CostEl/CostEl'

export const CostList = ({costs} : {costs : ICost[]}) => {
   

   return (
      <ul className='list-group'>
         {costs.map((cost,ind) => 
           (<CostEl key={cost._id} cost={cost} ind={ind + 1}/>) 
            )}
      </ul>
   )
}