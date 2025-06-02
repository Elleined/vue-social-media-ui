import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useJWTStore} from "@/stores/jwtStore.ts";

export function routeGuard(to: RouteLocationNormalized,
                          from: RouteLocationNormalized,
                          next: NavigationGuardNext) {

    const jwtStore = useJWTStore()

    if (!jwtStore.getPrincipal()) {
        return next('/login') // Redirect to login if not authenticated
    }

    return next() // Proceed to route
}