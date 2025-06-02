import {usePrincipalStore} from "@/stores/principalStore.ts";
import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";

export function routeGuard(to: RouteLocationNormalized,
                          from: RouteLocationNormalized,
                          next: NavigationGuardNext) {

    const principalStore = usePrincipalStore()

    if (!principalStore.getPrincipal()) {
        return next('/login') // Redirect to login if not authenticated
    }

    return next() // Proceed to route
}