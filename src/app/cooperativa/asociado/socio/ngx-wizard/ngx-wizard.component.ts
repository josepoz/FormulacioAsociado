import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'multi-step-wizard-app',
    templateUrl: './ngx-wizard.component.html',
    styleUrls: ['./ngx-wizard.component.scss']
})

export class NGXFormWizardComponent implements OnInit {
    constructor(private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
       
        this.router.navigate(['/aso/form/wizard'], { skipLocationChange: true });
    }

}