export namespace Toast {
  export type Positions =
    | "top left"
    | "top center"
    | "top right"
    | "bottom left"
    | "bottom center"
    | "bottom right";
  export type Options = {
    position?: Toast.Positions;
    duration?: number;
    closable?: boolean;
  };
  export type Instance = {
    id: number;
    message: string;
    type: Toast.Types;
    closable: boolean;
  };
  export type Factory = (message: string, options?: Toast.Options) => void;
  export type TypesArray = [
    "success",
    "error",
    "info",
    "warning",
    "notification"
  ];
  export type Types = Toast.TypesArray[number];
  export type Controller = { [K in Types]: Factory };
}
