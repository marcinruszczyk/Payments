import { Component, OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from "../payment-detail-form/payment-detail-form/payment-detail-form.component";
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../../shared/payment-detail.model';

@Component({
    selector: 'app-payment-details',
    standalone: true,
    templateUrl: './payment-details.component.html',
    styles: ``,
    imports: [PaymentDetailFormComponent,CommonModule]
})
export class PaymentDetailsComponent implements OnInit {
  constructor(public service: PaymentDetailService) {  }
    ngOnInit(): void {
       this.service.refreshList();
    }

    populateForm(selectedRecord:PaymentDetail) {
      this.service.formData = Object.assign({},selectedRecord);
    }

    onDelete(id:number) {
      if(confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
        },
        error: err => {console.log(err)}
      })
    }


}
