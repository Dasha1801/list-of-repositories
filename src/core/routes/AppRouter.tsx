import React from 'react'
import { Navigate, RouteObject, useLocation, useRoutes } from 'react-router-dom'
import { AllRoutes } from './AllRoutes'
import RepositoriesPage from '../../pages/RepositoriesPage'

interface IRedirect {
  path?: string
}

export const AppRedirect = ({ path = '/' }: IRedirect) => {
  const location = useLocation()
  return <Navigate to={path} state={{ from: location }} replace />
}

const baseRoutes: RouteObject = {
  path: AllRoutes.root.path,
  children: [
    { index: true, element: <Navigate to={AllRoutes.repositories.path} replace /> },
    { path: AllRoutes.repositories.path, element: <RepositoriesPage /> },
    {
      path: AllRoutes.repositories.path, children: [
        { path: AllRoutes.repositoryId.path, element: <div>test</div> }
      ]
    },
    { path: '*', element: <AppRedirect path={AllRoutes.repositories.path} /> },
  ],
}

export const AppRouter = React.memo(() => {
  return useRoutes([baseRoutes])
})

