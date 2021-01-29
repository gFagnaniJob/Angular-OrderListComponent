# Angular-OrderListComponent

## Set-Up

1. Download the component from this repository

        git clone  https://github.com/gFagnaniJob/Angular-OrderListComponent.git

2. Insert folder "OrderListComponent" into your components folder and insert the "OrderListComponent" class into module declaration

        declarations: [
            OrderListComponent
        ],

3. Put the file order "orderList.ts" in your "models" folder and, if necessary, adjust the import path of "IListItem" in the file "order-list.component.ts"

        import { IListItem } from "../../models/orderList";

4. Insert the component in your page, passing the parameters "list" (of type "IListItem" and "title" of type string)

        <isp-order-list class="category-row" [title]="'your_title'" [list]="your_list"></isp-order-list>

5. Run your application

        ng serve

## Preview


This is how your component will look like

&nbsp;

<img src="./assets/screen-component.jpg"
     alt="component screenshot"
     style="float: ; margin-right: 10px;" />
