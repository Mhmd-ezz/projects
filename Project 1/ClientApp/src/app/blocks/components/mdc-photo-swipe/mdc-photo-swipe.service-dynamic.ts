import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { MdcPhotoSwipeModule } from './mdc-photo-swipe.module';
import { MdcPhotoSwipeComponent } from './mdc-photo-swipe.component';

// @Injectable({
//     providedIn: MdcPhotoSwipeModule
// })
export class MdcPhotoSwipeServiceDynamic {

    componentRef: ComponentRef<MdcPhotoSwipeComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    open() {
        setTimeout(() => {
            // const cmp = this.appendComponentToBody();

            // if you need to get access to input of injected component. Let's say ComponentToInject has public property title
            // const instance = cmp.instance;

            // if you need to get access to output of injected component. Let's say ComponentToInject assings EventEmitter to onClick property
            // instance.onClick.subscribe(() => { // do somethis })
            // });
        })

    }


    public appendComponentToBody() {
        //create a component reference
        this.componentRef = this.componentFactoryResolver.resolveComponentFactory(MdcPhotoSwipeComponent)
            .create(this.injector);

        const instance = this.componentRef.instance;

        // attach component to the appRef so that so that it will be dirty checked.
        this.appRef.attachView(this.componentRef.hostView);

        // get DOM element from component
        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        return this.componentRef;
    }

    removeComponentFromBody(componentRef?: ComponentRef<any>) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
    }


}
