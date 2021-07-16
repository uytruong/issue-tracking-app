import { ActivatedRouteSnapshot, Router } from "@angular/router";

export class RouteUtil {
    static collectRouteParams(router: Router) {
        let params = {};
        let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
        while (stack.length > 0) {
          const route = stack.pop()!;
          params = {...params, ...route.params};
          stack.push(...route.children);
        }
        return params;
      }
}