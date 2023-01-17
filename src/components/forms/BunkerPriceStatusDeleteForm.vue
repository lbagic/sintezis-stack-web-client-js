<script setup lang="ts">
import { grpc } from "@/services/api/grpc";
import BaseInputNumber from "../base/input/BaseInputNumber.vue";
import { useFormData } from "../base/input/inputController";

const props = defineProps<{
  onSubmit?: (promise?: Promise<any>) => void | any;
  onSuccess?: (data: any) => void | any;
}>();

const form = useFormData({ ID: 0 }, grpc.BunkerPriceStatusService.delete);
function submit() {
  const promise = form.submit();
  if (props.onSubmit) props.onSubmit(promise);
  if (props.onSuccess) promise.then(props.onSuccess);
}
defineExpose({ form });
</script>

<template>
  <form class="snt-grid" @submit.prevent>
    <BaseInputNumber label="Id" min="0" disabled v-model="form.model.ID" />
    <button
      :disabled="!form.isSubmittable"
      @click="submit"
      class="snt-button error"
    >
      Delete
    </button>
  </form>
</template>

<style scoped lang="scss"></style>
