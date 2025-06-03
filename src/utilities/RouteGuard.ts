import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";

export function routeGuard(to: RouteLocationNormalized,
                          from: RouteLocationNormalized,
                          next: NavigationGuardNext) {

    const accessToken = useAccessTokenStore().getPrincipal()

    if (!accessToken) {
        return next('/login') // Redirect to login if not authenticated
    }

    return next() // Proceed to route
}