import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { canDeactivateRegister } from './auth/Model/canDeactivate-interface';
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<canDeactivateRegister>
{
  canDeactivate(
    component: canDeactivateRegister,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate();
  }
}
