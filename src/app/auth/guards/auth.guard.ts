import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  const user = userService.getUser();

  if (!user.token) {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};
