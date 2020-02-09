import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Test from './Test'
import Login from './Login'
import user from './CreateUser'
import owner from './OwnerPages/CreateOwner'
import OwnerLogin from './OwnerPages/OwnerLogin'
import UserProfile from './UserProfile'
import OwnerProfile from './OwnerPages/OwnerProfile'
import Navbar from './LandingPage/Navbar'
import GHNav from './GrubHubMain/GHNav'
import GrubHubHome from './GrubHubMain/GrubHubHome'
import OrderPlaced from './GrubHubMain/OrderPlaced'
import RestaurantOrderDetails from './GrubHubMain/RestaurantOrderDetails'
import RestDetails from './GrubHubMain/RestDetails'
import AddItems from './OwnerPages/Additems'
import Updateitem from './OwnerPages/Updateitem'
import OwnerNavbar from './OwnerPages/OwnerNavbar'
import AllOrderstoRestaurants from './OwnerPages/AllOrderstoRestaurant'
import CentralContent from './GrubHubMain/CentralContent'
import UserOrderDetails from './GrubHubMain/UserOrderDetails'

// Create a Main Component
class Main extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          {/* Render Different Component based on Route */}
          <Route path='/' exact component={CentralContent} />
          <Route path='/buyer/' component={GHNav} />
          <Route path='/buyer/home' component={GrubHubHome} />
          <Route path='/buyer/orderplaced' component={OrderPlaced} />
          <Route path='/buyer/userprofile' exact component={UserProfile} />

          <Route path='/grubhub' exact component={Test} />
          <Route path='/buyer/login' exact component={Login} />
          <Route path='/buyer/user' exact component={user} />
          <Route
            path='/buyer/orderdetails'
            exact
            component={UserOrderDetails}
          />

          <Route path='/owner/' component={OwnerNavbar} />
          <Route path='/owner/ownerlogin' exact component={OwnerLogin} />
          <Route path='/owner/updateitem' exact component={Updateitem} />
          <Route path='/owner/owner' exact component={owner} />
          <Route path='/owner/additems/' component={AddItems} />
          <Route path='/owner/ownerprofile' exact component={OwnerProfile} />
          <Route
            path='/owner/allorderstorest'
            component={AllOrderstoRestaurants}
          />

          <Route
            path='/buyer/restorder'
            exact
            component={RestaurantOrderDetails}
          />
          <Route path='/buyer/restdetails' exact component={RestDetails} />
        </div>
      </BrowserRouter>
    )
  }
}
// Export The Main Component
export default Main
