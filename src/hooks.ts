import { useAccountService } from "@/modules/account/accountService";

function onOpened() {
  const account = useAccountService();
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
