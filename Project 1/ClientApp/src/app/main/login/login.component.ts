import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/blocks/auth/auth.service';
import { Router, NavigationEnd, CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    previousUrl: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    
    ngAfterViewInit() {
        let previousUrl = localStorage.getItem("previousUrl")
        let loggedIn = this.authService.hasValidToken()

        if (loggedIn && previousUrl != "") {
            setTimeout(() => {
                this._router.navigateByUrl(previousUrl);
                localStorage.setItem("previousUrl", "")
            }, 100);
        }
    }

    login($event) {
        // @ Reload discover document in case the server was unreachable when the application was loaded
        this.authService.loadDiscoveryDocument();

        $event.preventDefault();
        this.authService.login(window.location.origin + "/patients");
    }
}
