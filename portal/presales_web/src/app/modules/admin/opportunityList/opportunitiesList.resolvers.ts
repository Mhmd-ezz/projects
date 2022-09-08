import { Opportunity } from './../../../core/interface/opportunity.interface';
import { IPaginateInfo } from './../../../core/interface/IpaginatedInfo.interface';
import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesListResolver implements Resolve<any> {

  constructor(private _opportunitiesService: OpportunitiesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaginateInfo<Opportunity>> {
    // return this._inventoryService.getProducts();
    return this._opportunitiesService.getOpportunities();
  }

}
