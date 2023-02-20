import type { InputTypes } from "@/components/base/input/input.types";
import type { Message, PartialMessage } from "@bufbuild/protobuf";
import { has, keys, mapObjIndexed, not, values } from "ramda";
import { computed, reactive, ref } from "vue";

type DataType = Record<PropertyKey, any>;
type FunctionType = (...args: any[]) => Promise<any>;
type ResolvedType<T, AltT> = T extends Message<any> | DataType
  ? PartialMessage<T & Message<any>>
  : AltT extends DataType
  ? PartialMessage<AltT & Message<any>>
  : DataType;
// type ResolvedType<T, AltT> = T extends Message<any>
//   ? PartialMessage<T>
//   : T extends DataType
//   ? T
//   : AltT extends DataType
//   ? Partial<AltT>
//   : DataType;

export function useForm<
  T,
  Call extends FunctionType = never,
  AltT = Call extends never ? never : Parameters<Call>[0],
  Data extends ResolvedType<T, AltT> = ResolvedType<T, AltT>
>(data: Data, call?: Call) {
  const fields = keys(data);
  const ctx = reactive({
    data: data,
    error: mapObjIndexed(() => null, data),
    dirty: mapObjIndexed(() => false, data),
  }) as InputTypes.ContextType<Data>;

  const model = mapObjIndexed((_, key) => {
    const isFormModel = { value: true, configurable: false };
    const accessors = mapObjIndexed(
      (ctxField: any) => ({
        get: () => ctxField[key],
        set: (value: any) => (ctxField[key] = value),
        enumerable: true,
      }),
      ctx
    );
    return Object.defineProperties({}, { isFormModel, ...accessors });
  }, data) as InputTypes.ModelType<Data>;

  function hydrate(data: any) {
    if (typeof data === "object")
      fields.forEach((key) => {
        if (has(key as any, data)) (ctx.data as any)[key] = data[key];
      });
  }

  function reset() {
    fields.forEach((key) => {
      model[key].data = data[key];
      model[key].error = null;
      model[key].dirty = false;
    });
  }

  const isPending = ref(false);
  const isValid = computed(() => values(ctx.error).every(not));
  const isSubmittable = computed(() => isValid.value && !isPending.value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let successFn = (response: AltT) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let errorFn = (error: any) => {};
  const onSuccess = (handler: typeof successFn) => (successFn = handler);
  const onError = (handler: typeof errorFn) => (errorFn = handler);

  const submit = () =>
    call?.(ctx.data)
      .then((res) => {
        isPending.value = false;
        successFn(res);
      })
      .catch((error) => {
        isPending.value = false;
        errorFn(error);
      });
  return reactive({
    ...ctx,
    model,
    reset,
    hydrate,
    submit: submit as Call,
    onSuccess,
    onError,
    isPending,
    isValid,
    isSubmittable,
  });
}

// type TestType = { id: number; name?: string };
// const fn = (req: TestType) => Promise.resolve(req);
// useForm();

// useForm<TestType>({ id: 1 });
// useForm<TestType>({});

// useForm<User>({ id: 1 });
// useForm<User>({});

// useForm({ id: 1 }, fn);
// useForm({}, fn);

// async function login(payload: LoginRequest) {
//   const response = await grpc.AccountService.login(payload);
//   response;
// }

// useForm({ provider: 0 }, login);
// useForm({ address: "asd" }, grpc.UserService.add);
