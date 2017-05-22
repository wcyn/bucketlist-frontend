import { IUser } from '../user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";


@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    private messages: Array<string> = [];
    token_expired: any;
    field_errors: object;
    userForm: FormGroup;

    ngOnInit(){
        this.userForm = this._fb.group({
            username: ['', [ <any>Validators.required,
                <any>Validators.maxLength(100)]],
            email: ['', [ <any>Validators.required,
                <any>Validators.maxLength(100)]],
            password: ['', [ <any>Validators.required,
                <any>Validators.minLength(6)]]
        });
    }
    
    constructor(private _userservice: UserService,
                private _fb: FormBuilder,
                private _router: Router,
                private _toastyConfig: ToastyConfig,
                private _toastyService: ToastyService){
        this._toastyConfig.theme = 'material';
        this._toastyConfig.showClose = true;
        this._toastyConfig.timeout = 5000;        
    }

    registerUser(userData: IUser) {
        this._userservice.registerUser(userData.password, userData.username, userData.email)
            .subscribe(
                    (data) => {
                    // Welcome the user
                        let toastOptions: ToastOptions = {
                            title: "Welcome " + data.username,
                            msg: "You have been successfully registered"
                        };
                        this._toastyService.success(toastOptions);
                        this._router.navigate(['login']);
         },
                (error) => {
                    if (error.errors) {
                        let errors = error.errors;
                        console.log("Errors: ", error);
                        let toastOptions: ToastOptions = {
                            title: "",
                            msg: errors,
                        };
                        this._toastyService.error(toastOptions);
                    }
                    else if (error.field_errors) {
                        this.field_errors = error.field_errors;
                    }
                    else {
                        let error_message = "Woops! Something went wrong"
                        let toastOptions: ToastOptions = {
                            title: "Server Error",
                            msg: error_message
                        };
                        this._toastyService.error(toastOptions);
                    }
                }
            );
    }
}
