import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { tap, Observable, take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class PublicGuard {
}

const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    take(1),
    tap((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
}
export const canActivatePublicGuard: CanActivateFn = isAuthenticated;
export const canMatchPublicGuard: CanMatchFn = isAuthenticated;
