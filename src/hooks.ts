import { useAccountStore } from "@/modules/account/accountStore";

function onOpened() {
  const account = useAccountStore();
  if (account.isLoggedIn) onLoggedIn();
}
function onClosed() {}
function onLoggedIn() {}
function onLoggedOut() {}

export const lifecycleHooks = {
  onOpened,
  onClosed,
  onLoggedIn,
  onLoggedOut,
};
