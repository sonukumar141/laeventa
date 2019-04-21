import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/home/home.module#HomeModule' },
            { path: 'account', loadChildren: './pages/account/account.module#AccountModule', data: { breadcrumb: 'Account Settings' } },
            { path: 'compare', loadChildren: './pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: './pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: './pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' } },
            { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
            { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule', data: { breadcrumb: 'Auth ' } },
            { path: 'hotel-sign-up', loadChildren: './pages/hotel-sign-in/hotel-sign-in.module#HotelSignInModule', data: { breadcrumb: 'Hotel Registration ' } },
            { path: 'vendor-sign-up', loadChildren: './pages/vendor-sign-in/vendor-sign-in.module#VendorSignInModule', data: { breadcrumb: 'Vendor Registration ' } },
            { path: 'brands', loadChildren: './pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
            { path: ':city/hotels', loadChildren: './pages/products/product-search/product-search.module#ProductSearchModule', data: { breadcrumb: 'Hotels'} },
            { path: ':city/vendors', loadChildren: './pages/products/productv-search/productv-search.module#ProductvSearchModule', data: { breadcrumb: 'Vendors'} },
            { path: 'create-venue/new', loadChildren: './pages/create-hotel/create-hotel.module#CreateHotelModule', data: { breadcrumb: 'List new Venue'} },
            { path: 'create-venue-area', loadChildren: './theme/components/create-venue-area/create-venue-area.module#CreateVenueAreaModule', data: { breadcrumb: 'Create new Area'} },
            { path: 'create-vendor/new', loadChildren: './pages/create-vendor/create-vendor.module#CreateVendorModule', data: { breadcrumb: 'List your Business'} },
            { path: 'venues', loadChildren: './pages/products/productsh/productsh.module#ProductshModule', data: { breadcrumb: 'Venue' } },
            { path: 'productsv', loadChildren: './pages/products/productsv/productsv.module#ProductsvModule', data: { breadcrumb: 'Vendors' } },
            { path: 'forgot', loadChildren: './pages/forgot-password/password-reset.module#ForgotPasswordModule', data: { breadcrumb: 'Password Reset' } },
            { path: 'reset', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordModule', data: { breadcrumb: 'Password Reset' } },
            { path: 'forgot-password', loadChildren: './pages/forgot-password-venue/password-reset-venue.module#ForgotPasswordVenueModule', data: { breadcrumb: 'Password Reset' } },
            { path: 'reset-password', loadChildren: './pages/reset-password-venue/reset-password-venue.module#ResetPasswordVenueModule', data: { breadcrumb: 'Password Reset' } },
            { path: 'h/:category', loadChildren: './pages/products/hotel-search-by-category/hotel-search-by-category.module#HotelSearchByCategoryModule', data: { breadcrumb: 'Category' } },
            { path: 'dashboard/h', loadChildren: './pages/dashboard/hotel-dashboard/hotel-dashboard.module#HotelDashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'manage/venues', loadChildren: './pages/manage/manage.module#ManageModule', data: {breadcrumb: 'Manage'} },
            { path: 'privacy-policy', loadChildren: './pages/policy/policy.module#PolicyModule', data: {breadcrumb: 'Privacy Policy'} },
            { path: 'terms-condition', loadChildren: './pages/terms/terms.module#TermsModule', data: {breadcrumb: 'Terms & Condition'} },
            { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsModule', data: {breadcrumb: 'About Us'} },
            { path: '', loadChildren: './pages/update/update-venue/product-venue-update.module#ProductVenueUpdateModule', data: {breadcrumb: 'Update'} },
        ]
    },
    //{ path: 'auth', component: SignInComponent}
    //{ path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});