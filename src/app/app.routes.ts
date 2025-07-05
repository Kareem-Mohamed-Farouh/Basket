import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PurchaseOrderComponent } from './pages/purchase-order/purchase-order.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ChackoutComponent } from './pages/chackout/chackout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { urlGuard } from './core/guards/guardUrl/url.guard';
import { AllOrderComponent } from './pages/all-order/all-order.component';


export const routes: Routes = [

    {path: '' , redirectTo: 'home' , pathMatch: 'full'},
    {path: 'home', component: HomeComponent , canActivate:[urlGuard] ,title: 'home'},
    {path: 'shop', component: ShopComponent , canActivate:[urlGuard] ,title: 'shop'},
    {path: 'cart', component: CartComponent , canActivate:[urlGuard] ,title: 'cart'},
    {path: 'allOrder', component: AllOrderComponent , canActivate:[urlGuard] ,title: 'All Order'},
    {path: 'purchaseorder', component: PurchaseOrderComponent , canActivate:[urlGuard] ,title: 'purchaseorder'},
    {path: 'blog', component: BlogComponent , canActivate:[urlGuard] ,title: 'blog'},
    {path: 'register', component: RegisterComponent  ,title: 'Register'},
    {path: 'login', component: LoginComponent  ,title: 'Login'},
    {path: 'contact', component: ContactComponent , canActivate:[urlGuard] ,title: 'contact'},
    {path: 'aboutus', component: AboutUsComponent ,title: 'aboutus'},
    {path: 'chackout', component: ChackoutComponent  , canActivate:[urlGuard] ,title: 'chackout'},
    {path: '**', component: NotfoundComponent ,title: 'notfound'},
    

];
