<script setup lang="ts">
import { grpc } from "@/services/api/grpc";
import BaseInput from "../base/input/BaseInput.vue";
import BaseInputNumber from "../base/input/BaseInputNumber.vue";
import { useFormData } from "../base/input/inputController";

const props = defineProps<{
  onSubmit?: (promise?: Promise<any>) => void | any;
  onSuccess?: (data: any) => void | any;
}>();

const form = useFormData(
  { ID: 0, priceStatus: "" },
  grpc.BunkerPriceStatusService.edit
);
function submit() {
  const promise = form.submit();
  if (props.onSubmit) props.onSubmit(promise);
  if (props.onSuccess) promise.then(props.onSuccess);
}
defineExpose({ form });
</script>

<template>
  <form class="snt-grid" @submit.prevent>
    <BaseInputNumber
      :constraint="{ required: true }"
      label="Id"
      min="0"
      disabled
      v-model="form.model.ID"
    />
    <BaseInput
      :constraint="{ required: true }"
      label="Price Status"
      v-model="form.model.priceStatus"
    />
    <button
      :disabled="!form.isSubmittable"
      @click="submit"
      class="snt-button warning"
    >
      Edit
    </button>
  </form>
</template>

<style scoped lang="scss"></style>
