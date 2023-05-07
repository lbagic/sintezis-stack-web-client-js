import { useAccountModule } from "@/modules/account/accountModule";

function onOpened() {
  const account = useAccountModule();
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
