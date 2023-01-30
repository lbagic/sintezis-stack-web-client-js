import { router } from "@/app/router";
import { useAccountStore } from "@/modules/account/accountStore";

function onOpened() {
  const account = useAccountStore();
  if (account.isLoggedIn) onLoggedIn();
}
function onClosed() {}
function onLoggedIn() {
  router.push("/");
}
function onLoggedOut() {
  router.push("/login");
}

export const lifecycleHooks = {
  onOpened,
  onClosed,
  onLoggedIn,
  onLoggedOut,
};
