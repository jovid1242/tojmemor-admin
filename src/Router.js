import React, { Suspense, lazy } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { history } from './history'
import { connect } from 'react-redux'
import Spinner from './components/@vuexy/spinner/Loading-spinner'
import { ContextLayout } from './utility/context/Layout'

// Route-based code splitting
const Home = lazy(() => import('./views/pages/Home'))

const Page2 = lazy(() => import('./views/pages/Page2'))
const Projects = lazy(() => import('./views/pages/Projects'))
const News = lazy(() => import('./views/pages/News'))
const Video = lazy(() => import('./views/pages/Video'))
const UserProfile = lazy(() => import('./views/pages/UserProfile'))
const UserEditProfile = lazy(() => import('./views/pages/UserEditProfile'))
const Sale = lazy(() => import('./views/pages/Sale'))
const Instagram = lazy(() => import('./views/pages/Instagram'))
const Users = lazy(() => import('./views/pages/Users'))
const Team = lazy(() => import('./views/pages/Team'))
const Career = lazy(() => import('./views/pages/Career'))
const Slider = lazy(() => import('./views/pages/Slider'))
const Stock = lazy(() => import('./views/pages/Stock'))
const Login = lazy(() => import('./views/pages/authentication/login/Login'))
const Layouts = lazy(() => import('./views/pages/Layouts'))
const Pr_sliders = lazy(() => import('./views/pages/Pr_sliders'))
const Pr_contacts = lazy(() => import('./views/pages/Pr_contacts'))
const error404 = lazy(() => import('./views/pages/404'))
const isAuthenticated = () => {
    const profile = JSON.parse(localStorage.getItem('user'))
    if (profile && profile.token) {
        return true
    }
    return false
}
const isPublicRoutes = (pathName) => {
    const routes = ['/pages/login']
    return routes.includes(pathName)
}
// Set Layout and Component Using App Route
const RouteConfig = ({
    component: Component,
    fullLayout,
    permission,
    user,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isPublicRoutes(props.match.path) && !isAuthenticated()) {
                return <Redirect to="/pages/login" />
            }
            return (
                <ContextLayout.Consumer>
                    {(context) => {
                        let LayoutTag =
                            fullLayout === true
                                ? context.fullLayout
                                : context.state.activeLayout === 'horizontal'
                                ? context.horizontalLayout
                                : context.VerticalLayout
                        return (
                            <LayoutTag {...props} permission={props.user}>
                                <Suspense fallback={<Spinner />}>
                                    <Component {...props} />
                                </Suspense>
                            </LayoutTag>
                        )
                    }}
                </ContextLayout.Consumer>
            )
        }}
    />
)
const mapStateToProps = (state) => {
    return {
        user: state.auth.login.userRole,
    }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
    render() {
        return (
            // Set the directory path if you are deploying in sub-folder
            <Router history={history}>
                <Switch>
                    <AppRoute exact path="/" component={Home} />
                    <AppRoute path="/page2" component={Page2} />
                    <AppRoute path="/pages/news" component={News} />
                    <AppRoute path="/pages/projects" component={Projects} />
                    <AppRoute path="/pages/slider" component={Slider} />
                    <AppRoute path="/pages/application" component={Stock} />
                    <AppRoute path="/pages/team" component={Team} />
                    <AppRoute path="/pages/layouts" component={Layouts} />
                    <AppRoute path="/pages/video" component={Video} />
                    <AppRoute path="/pages/career" component={Career} />
                    <AppRoute
                        path="/pages/pr_contacts"
                        component={Pr_contacts}
                    />
                    <AppRoute path="/pages/pr_sliders" component={Pr_sliders} />
                    <AppRoute path="/pages/profile" component={UserProfile} />
                    <AppRoute
                        path="/pages/profile-edit"
                        component={UserEditProfile}
                    />
                    <AppRoute path="/pages/sale" component={Sale} />
                    <AppRoute path="/pages/instagram" component={Instagram} />
                    <AppRoute path="/pages/users" component={Users} />
                    <AppRoute
                        path="/pages/login"
                        component={Login}
                        fullLayout
                    />
                    <AppRoute
                        path="/pages/404"
                        component={error404}
                        fullLayout
                    />
                    <AppRoute component={error404} fullLayout />
                </Switch>
            </Router>
        )
    }
}

export default AppRouter
