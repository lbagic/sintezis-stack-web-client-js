import { toast } from "../../../components/base/toast.ctl";
import { createResponseInterceptor } from "../base/BaseGrpc.utils";

/**
 * Emit toast messages on success/error responses (response interceptor)
 */
export const notificationInterceptor = {
  grpc: createResponseInterceptor({
    onUnaryResponse({ ctx }) {
      toast.success(ctx.name);
    },
    onError({ error }) {
      const messages = error?.message.split("|");
      const [type, userMessage, debugMessage] = messages;
      if (type && userMessage && debugMessage) toast.error(userMessage);
    },
  }),
};
