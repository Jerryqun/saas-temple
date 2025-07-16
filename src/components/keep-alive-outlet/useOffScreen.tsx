// import { useLocation, Outlet, useNavigationType } from 'react-router-dom'
// import { useMemoizedFn, useScroll } from 'ahooks'
// import { useEffect, useRef, useState } from 'react'
// import { produce } from 'immer'

// const useOffScreen = () => {
//   const [outlets, setOutlets] = useState<any>([])
//   const { pathname, key } = useLocation()
//   console.log('key----: ', key)
//   const navigationType = useNavigationType()

//   const topRef = useRef<number>()

//   // layout容器滚动位置
//   const layoutScrollTo = useMemoizedFn(top =>
//     document.getElementsByClassName('ant-pro-grid-content-children')?.[0]?.scrollTo?.({ top })
//   )

//   const { top = 0 } = useScroll(document.getElementsByClassName('ant-pro-grid-content-children')?.[0]) ?? {}
//   topRef.current = top
//   useEffect(() => {
//     const initItem = {
//       scrollOffset: 0,
//       key,
//       pathname,
//       outlet: <Outlet />
//     }
//     console.log(
//       'outlets.find((o: any) => o.key === key)',
//       outlets.find((o: any) => o.key === key)
//     )
//     if (outlets.length === 0) {
//       setOutlets([initItem])
//     } else if (outlets.find((o: any) => o.key === key)) {
//       setOutlets([...outlets, initItem])
//     }
//     // setOutlets((prev: any) => {
//     //   return produce(prev, (draft: any) => {
//     //     const index = draft.findIndex((v: any) => v.key === key)
//     //     const initItem = {
//     //       scrollOffset: 0,
//     //       key,
//     //       pathname,
//     //       outlet: <Outlet />
//     //     }
//     //     if (index < 0) {
//     //       draft.push(initItem)
//     //       return
//     //     }
//     //   })
//     //   // if (history?.action === "REPLACE") {
//     //   //   console.log("ok1");
//     //   //   prev.splice(0, prev.length);
//     //   //   prev.push(initItem);
//     //   //   return;
//     //   // }
//     //   // if (history?.action !== "POP") {
//     //   //   console.log("ok2");
//     //   //   remove(prev, (v) => v.key === key);
//     //   //   prev.push(initItem);
//     //   //   return;
//     //   // }
//     // })
//     // return () => {
//     //   setOutlets((prev: any) => {
//     //     return produce(prev, (draft: any) => {
//     //       const index = draft.findIndex((v: any) => v.key === key)
//     //       if (index !== -1) {
//     //         draft[index].scrollOffset = topRef.current
//     //       }
//     //     })
//     //   })
//     // }
//   }, [pathname, key])

//   // useEffect(() => {
//   //   const index = outlets.findIndex((v: any) => v.key === key)
//   //   if (index > -1) {
//   //     if (navigationType !== 'POP') {
//   //       layoutScrollTo(0)
//   //     } else {
//   //       layoutScrollTo(outlets[index].scrollOffset)
//   //     }
//   //   }
//   // }, [outlets, navigationType])

//   return { outlets }
// }

// export default useOffScreen
