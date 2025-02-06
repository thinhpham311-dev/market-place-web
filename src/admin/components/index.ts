import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    Dashboard: componentLoader.add('DashboardComponent', './dashboard'),
}

export { componentLoader, Components }