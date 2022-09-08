import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IPaginateInfo } from 'app/core/interface/IpaginatedInfo.interface';
import { Opportunity } from 'app/core/interface/opportunity.interface';

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
