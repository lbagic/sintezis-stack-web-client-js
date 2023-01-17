<script setup lang="ts">
import { grpc } from "@/services/api/grpc";
import { usePromise } from "@/utils/usePromise";
import type { SelectOption } from "naive-ui";
import { ref } from "vue";
import BaseInputNumber from "../base/input/BaseInputNumber.vue";
import BaseSelect from "../base/input/BaseSelect.vue";
import { useFormData } from "../base/input/inputController";

const props = defineProps<{
  onSubmit?: (promise?: Promise<any>) => void | any;
  onSuccess?: (data: any) => void | any;
}>();

const form = useFormData(
  {
    ID: undefined,
    bunkerPriceStatusID: undefined,
  },
  grpc.BunkerPriceService.add
);
function submit() {
  const promise = form.submit();
  if (props.onSubmit) props.onSubmit(promise);
  if (props.onSuccess) promise.then(props.onSuccess);
}
defineExpose({ form });

const bunkerPriceStatusOptions = ref<SelectOption[]>([]);
const getBunkerPriceStatuses = usePromise(grpc.BunkerPriceStatusService.getAll);
getBunkerPriceStatuses.execute({}).then((res) => {
  bunkerPriceStatusOptions.value = res.bunkerPriceStatuses.map((el) => ({
    value: el.ID,
    label: el.priceStatus,
  }));
});
</script>

<template>
  <form class="snt-grid" @submit.prevent>
    <BaseInputNumber
      :constraint="{ required: true }"
      label="Id"
      min="0"
      v-model="form.model.ID"
    />
    <BaseSelect
      :constraint="{ required: true }"
      :options="bunkerPriceStatusOptions"
      label="Price Status"
      filterable
      :loading="getBunkerPriceStatuses.isPending"
      v-model="form.model.bunkerPriceStatusID"
    />
    <button
      :disabled="!form.isSubmittable"
      @click="submit"
      class="snt-button primary"
    >
      Add
    </button>
  </form>
</template>

<style scoped lang="scss"></style>
