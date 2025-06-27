import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PurchaseOrderComponent } from './pages/purchase-order/purchase-order.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ChackoutComponent } from './pages/chackout/chackout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [

    {path: '' , redirectTo: 'home' , pathMatch: 'full'},
    {path: 'home', component: HomeComponent ,title: 'home'},
    {path: 'shop', component: ShopComponent ,title: 'shop'},
    {path: 'purchaseorder', component: PurchaseOrderComponent ,title: 'purchaseorder'},
    {path: 'blog', component: BlogComponent ,title: 'blog'},
    {path: 'contact', component: ContactComponent ,title: 'contact'},
    {path: 'aboutus', component: AboutUsComponent ,title: 'aboutus'},
    {path: 'chackout', component: ChackoutComponent ,title: 'chackout'},
    {path: '**', component: NotfoundComponent ,title: 'notfound'},
    

];
