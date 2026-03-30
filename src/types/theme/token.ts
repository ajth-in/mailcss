export interface Token<Value = any> {
  value: Value;
  description?: string;
  type?: string;
  deprecated?: boolean | string;
  extensions?: {
    [key: string]: any;
  };
}

export type RecursiveToken<C extends string, V> =
  | V
  | {
      [K in C]: RecursiveToken<C, V>;
    };

export interface SemanticToken<Value = string, Condition extends string = string> extends Token<
  RecursiveToken<Condition, Value>
> {}

export interface Gradient {
  type: "linear" | "radial";
  placement: string | number;
  stops:
    | Array<{
        color: string;
        position: number;
      }>
    | Array<string>;
}

export interface Asset {
  type: "url" | "svg";
  value: string;
}
