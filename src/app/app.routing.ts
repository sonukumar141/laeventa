import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { ProductSearchComponent } from './pages/products/product-search/product-search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './pages/shared/auth.guard';
import { AuthService } from './pages/shared/auth.service';
import { SignInComponent } from './pages/sign-in/sign-in.component';

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
            { path: 'create-venue/new', loadChildren: './pages/create-hotel/create-hotel.module#CreateHotelModule', data: { breadcrumb: 'List new Hotel/Venue'} },
            { path: 'create-vendor/new', loadChildren: './pages/create-vendor/create-vendor.module#CreateVendorModule', data: { breadcrumb: 'List your Business'} },
            { path: 'productsh', loadChildren: './pages/products/productsh/productsh.module#ProductshModule', data: { breadcrumb: 'Hotel/Venue' } },
            { path: 'productsv', loadChildren: './pages/products/productsv/productsv.module#ProductsvModule', data: { breadcrumb: 'Vendors' } }
        ]
    },
    //{ path: 'auth', component: SignInComponent}
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});