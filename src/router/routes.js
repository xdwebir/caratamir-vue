
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/forgotpassword',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ForgotPassword.vue') }
    ]
  },
  {
    path: '/forgotpasswordverify',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ForgotPasswordVerify.vue') }
    ]
  },
  {
    path: '/accountant/confirmpayment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/accountant/ConfirmPaymentList.vue') }
    ]
  },
  {
    path: '/accountant/confirmpayment/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/accountant/ConfirmPaymentItem.vue') }
    ]
  },
  {
    path: '/customer/addorder',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/customer/AddOrder.vue') }
    ]
  },
  {
    path: '/provider/pricedefinelist',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/PriceDefineList.vue') }
    ]
  },
  {
    path: '/provider/paymentshistory',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/PaymentsHistory.vue') }
    ]
  },
  {
    path: '/provider/ordershistory',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/OrdersHistory.vue') }
    ]
  },
  {
    path: '/provider/addpayment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/AddPayment.vue') }
    ]
  },
  {
    path: '/provider/pricedefinelist/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/PriceDefineItem.vue') }
    ]
  },
  {
    path: '/operator/waitingorders',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/operator/WaitingOrders.vue') }
    ]
  },
  {
    path: '/operator/waitingorders/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/operator/AssignProviderToOrder.vue') }
    ]
  },
  {
    path: '/provider/editprofile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/provider/EditProfile.vue') }
    ]
  },
  {
    path: '/user/editprofile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditProfile.vue') }
    ]
  },
  {
    path: '/customer/orderslist',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/customer/OrdersList.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/verify',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/VerifyPage.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  {
    path: '/logout',
    component: () => import('pages/LogoutPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
