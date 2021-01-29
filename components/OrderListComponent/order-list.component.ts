import { Component, OnInit, OnChanges, OnDestroy, Input, Injector, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { IListItem } from "../../models/orderList";

@Component({
    selector: 'isp-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy, OnChanges {

    toDestroy$ = new Subject<void>();

    @Input() list: IListItem[] = []
    @Input() title: string
    @Output() onOrderChange = new EventEmitter<IListItem[]>();

    currentSelectedID: number = null;
    buttonUpDisabled: boolean = true;
    buttonDownDisabled: boolean = true;

    constructor(
    ) {
        
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    selectRow(id: number) {
        if (this.currentSelectedID === id) {
            this.currentSelectedID = null;
            this.buttonUpDisabled = true;
            this.buttonDownDisabled = true;
        } else {
            this.currentSelectedID = id;

            let maxOrder: number = Math.max(...this.list.map(x => x.order));
            let minOrder: number = Math.min(...this.list.map(x => x.order));
            let currentServiceSelected = this.list.filter(el => el.id === this.currentSelectedID)[0];

            this.disableUpAndDown(currentServiceSelected, maxOrder, minOrder);
        }
    }

    onUpClick() {
        if (this.isValid(this.currentSelectedID) && !this.buttonUpDisabled) {
            let maxOrder: number = Math.max(...this.list.map(x => x.order));
            let minOrder: number = Math.min(...this.list.map(x => x.order));
            let tmp: IListItem = this.list.filter(el => el.id === this.currentSelectedID)[0];
            let tmpOrder: number = tmp.order;
            let indexOftmp: number = this.list.indexOf(tmp);
            // let prev: ServiceListModel = this.serviceList.filter(el => el.order === tmpOrder - 1)[0];
            let prev: IListItem = this.list[indexOftmp - 1];
            let prevOrder: number = prev.order;

            this.list.forEach(el => {
                if (el.id === tmp.id) {
                    el.order = prevOrder;
                    el.modified = true;
                }
                if (el.id === prev.id) {
                    el.order = tmpOrder;
                    el.modified = true;
                }
            });

            this.list.sort(this.compare);
            this.onOrderChange.emit(this.list.filter(el => el.modified));
            this.disableUpAndDown(tmp, maxOrder, minOrder);
        }
    }

    onDownClick() {
        if (this.isValid(this.currentSelectedID) && !this.buttonDownDisabled) {
            let maxOrder: number = Math.max(...this.list.map(x => x.order));
            let minOrder: number = Math.min(...this.list.map(x => x.order));
            let tmp: IListItem = this.list.filter(el => el.id === this.currentSelectedID)[0];
            let tmpOrder: number = tmp.order;
            let indexOftmp: number = this.list.indexOf(tmp);
            // let succ: ServiceListModel = this.serviceList.filter(el => el.order === tmpOrder + 1)[0];
            let succ: IListItem = this.list[indexOftmp + 1];
            let succOrder: number = succ.order;

            this.list.forEach(el => {
                if (el.id === tmp.id) {
                    el.order = succOrder;
                    el.modified = true;
                }
                if (el.id === succ.id) {
                    el.order = tmpOrder;
                    el.modified = true;
                }
            });

            this.list.sort(this.compare);
            this.onOrderChange.emit(this.list.filter(el => el.modified));
            this.disableUpAndDown(tmp, maxOrder, minOrder);
        }
    }

    disableUpAndDown(currentServiceSelected: IListItem, maxOrder: number, minOrder: number) {
        if (this.isValid(currentServiceSelected) && currentServiceSelected.order === maxOrder) {
            this.buttonDownDisabled = true;
        } else if (this.isValid(currentServiceSelected) && currentServiceSelected.order !== maxOrder) {
            this.buttonDownDisabled = false;
        }
        if (this.isValid(currentServiceSelected) && currentServiceSelected.order === minOrder) {
            this.buttonUpDisabled = true;
        } else if (this.isValid(currentServiceSelected) && currentServiceSelected.order !== minOrder) {
            this.buttonUpDisabled = false;
        }
    }

    isValid(v: any) {
        if (typeof (v) === 'string') {
            return v !== null && v !== void 0 && v !== ''
        } else {
            return v !== null && v !== void 0
        }
    }

    compare(a, b) {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    }


}