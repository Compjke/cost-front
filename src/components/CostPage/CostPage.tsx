import { useEffect, useMemo, useRef, useState } from 'react'
import { getUserData } from '../../utils/auth'
import { Spinner } from '../UI/Spinner/Spinner'
import { CostHeader } from './CostHeader/CostHeader'
import { getCostFx } from '../../api/costsClient'
import { $costs, setCosts } from '../../context'
import { useStore } from 'effector-react'
import { CostList } from './CostList/CostList'
import cl from './CostPage.module.css'

export const CostPage = () => {

   const [spinner , setSpinner] = useState(false)
   const shouldCostLoaded = useRef(true)
   const store = useStore($costs)

   useEffect(() => {
      if(shouldCostLoaded.current){
         shouldCostLoaded.current = false;
         getCosts()
         console.log(store)
      }
   }, [])

       const getCosts = async () => {
         setSpinner(true)
         const userData = getUserData();

         const costs = await getCostFx({
            url: '/cost',
            token : userData.access_token
         })

         setSpinner(false);
         setCosts(costs)
      }

   return (
      <div className={cl.cost_container}>
         <h2 className={cl.cost_title}>
            My expense tracker
         </h2>
      {useMemo(()=> <CostHeader costs={store}/>,[store])}
      {spinner && <Spinner/>}
      {useMemo(()=> <CostList costs={store}/>,[store])}
      {(!spinner && !store.length) && <h2>List of expenses is empty</h2>}
      </div>
   )
}